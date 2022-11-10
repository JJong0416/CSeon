package cseon.api.service;

import cseon.api.dto.response.ContestInfoRes;
import cseon.api.dto.response.ContestMyRankingRes;
import cseon.api.dto.response.ContestRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.ContestRepository;
import cseon.api.repository.WorkbookQuestionRepository;
import cseon.common.constant.RedisConst;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Contest;
import cseon.domain.WorkbookQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.*;

import static cseon.common.utils.SecurityUtils.getAccountName;

@Service
@RequiredArgsConstructor
public class ContestService extends RedisConst {

    private final ContestRepository contestRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final WorkbookQuestionRepository workbookQuestionRepository;
    private final QuestionSearchService questionSearchService;

    public ContestInfoRes SearchRankingInfo(Long contestId) {
        final String username = getAccountName();
        final String redisId = String.valueOf(contestId);

        ZSetOperations<String, String> ZSetOperations = redisTemplate.opsForZSet();

        // 1. Redis 서버에 내 정보가 없다면 넣어주고, 있으면 무시하고 로직을 수행한다.
        InitMyRankingInRedis(redisId, username, ZSetOperations);

        // 2. 1위부터 10위까지 가지고 온다.
        Set<ZSetOperations.TypedTuple<String>> typedTuples =
                ZSetOperations.reverseRangeWithScores(redisId, TOP_RANKING_LOW, TOP_RANKING_HIGH);

        // 3. 그래도 서버에 문제가 있다면, 바로 CustomException 터트려준다.
        checkRedisCondition(typedTuples);

        // 4. Redis에서 가져온 데이터를 SortedMap으로 매핑시킨다.
        SortedMap<String, Double> topRankingPlayer =
                SearchTopRankingPlayer(Objects.requireNonNull(typedTuples));

        // 5. 해당 정보를 통해서 현재 내 랭킹에 대한 정보를 가져온다.
        ContestMyRankingRes myRankingRes = SearchMyRankingInfo(redisId, username, topRankingPlayer, ZSetOperations);

        // 6. Contest 전체 정보를 반환해준다.
        return ContestInfoRes.builder()
                .highRanking(topRankingPlayer)
                .contestMyRankingRes(myRankingRes)
                .build();
    }

    private void solvedContestQuestion(Long contestId, Double score) {
        ZSetOperations<String, String> ZSetOperations = redisTemplate.opsForZSet();
        ZSetOperations.add(
                String.valueOf(contestId), getAccountName(), ZSetOperations.score(String.valueOf(contestId), getAccountName()) + score);
    }

    private SortedMap<String, Double> SearchTopRankingPlayer(Set<ZSetOperations.TypedTuple<String>> typedTuples) {
        SortedMap<String, Double> map = new TreeMap<>();

        for (TypedTuple<String> typedTuple : typedTuples) {
            if (map.put(typedTuple.getValue(), typedTuple.getScore()) != null)
                throw new IllegalStateException("Duplicate key");
        }
        return map;
    }

    private ContestMyRankingRes SearchMyRankingInfo(
            String redisId, String username, SortedMap<String, Double> topRankingPlayer, ZSetOperations<String, String> ZSetOperations) {
        return ContestMyRankingRes.builder()
                .myRank(ZSetOperations.rank(redisId, username))
                .myScore(ZSetOperations.score(redisId, username))
                .isExistMeInLeaderboard(topRankingPlayer.containsKey(username))
                .build();
    }

    private void InitMyRankingInRedis(
            String redisId, String username, ZSetOperations<String, String> ZSetOperations) {

        if (Objects.requireNonNull(redisTemplate.hasKey(redisId)).equals(false)
                || ZSetOperations.rank(redisId, username) == null)
            ZSetOperations.add(redisId, username, -1);
    }

    private void checkRedisCondition(Set<ZSetOperations.TypedTuple<String>> typedTuples) {
        if (Objects.requireNonNull(typedTuples).isEmpty()) {
            throw new CustomException(ErrorCode.CONTEST_NOT_EXIST_SERVER);
        }
    }


    @Transactional(readOnly = true)
    public List<ContestRes> getAllContestRes() {
        List<Contest> contests = contestRepository.findAllContests()
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.CONTEST_NOT_FOUND);
                });

        List<ContestRes> ctList = new ArrayList<>();
        for (Contest c : contests) {
            ZonedDateTime nowKr = ZonedDateTime.now();
            boolean check = nowKr.isAfter(c.getContestEnd());
            ctList.add(ContestRes.builder().contestTitle(c.getContestName()).
                    startTime(c.getContestStart()).
                    endTime(c.getContestEnd()).
                    isExpired(check)
                    .build());
        }
        return ctList;
    }

    @Transactional(readOnly = true)
    public List<QuestionDto> searchContestQuestionInfo(Long contestId) {
        Contest findContest =
                contestRepository.findContestByContestId(contestId).orElseThrow(() -> {
                    throw new CustomException(ErrorCode.CONTEST_NOT_FOUND);
                });

        List<WorkbookQuestion> questions =
                workbookQuestionRepository.findWorkbookQuestionsByWorkbookId(findContest.getWorkbookId()).orElseThrow(() -> {
                    throw new CustomException(ErrorCode.QUESTION_NOT_FOUND);
                });

        List<QuestionDto> questionDtoList = new ArrayList<>();

        for (WorkbookQuestion l : questions) {
            System.out.println(l.getQuestionId().getQuestionId());
            questionDtoList.add(questionSearchService.takeDetailsQuestion(l.getQuestionId().getQuestionId()));
        }
        return questionDtoList;
    }
}
