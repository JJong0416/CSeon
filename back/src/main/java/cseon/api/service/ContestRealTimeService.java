package cseon.api.service;

import cseon.api.dto.layer.AccountContestAnswerDto;
import cseon.api.dto.request.ContestAnswerReq;
import cseon.api.dto.response.ContestInfoRes;
import cseon.api.dto.response.ContestMyRankingRes;
import cseon.api.dto.response.RankingRes;
import cseon.common.constant.RedisConst;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.common.provider.KafkaProducerProvider;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static cseon.common.utils.SecurityUtils.getAccountName;

@Service
@RequiredArgsConstructor
public class ContestRealTimeService extends RedisConst {

    private final RedisTemplate<String, String> redisTemplate;
    private final KafkaProducerProvider kafkaProducerProvider;

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
        List<RankingRes> topRankingPlayer =
                SearchTopRankingPlayer(Objects.requireNonNull(typedTuples));

        // 5. 해당 정보를 통해서 현재 내 랭킹에 대한 정보를 가져온다.
        ContestMyRankingRes myRankingRes = SearchMyRankingInfo(redisId, username, topRankingPlayer, ZSetOperations);

        // 6. Contest 전체 정보를 반환해준다.
        return ContestInfoRes.builder()
                .highRanking(topRankingPlayer)
                .contestMyRankingRes(myRankingRes)
                .build();
    }

    public boolean pushAccountContestAnswer(ContestAnswerReq contestAnswerReq) {
        final String accountName = getAccountName();
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        InitMyRankingInRedis(String.valueOf(contestAnswerReq.getContestId()), getAccountName(), zSetOperations);

        Integer cor =
                floor(zSetOperations.score(String.valueOf(contestAnswerReq.getContestId()), getAccountName()) / 5);

        // 정답이면 score 증가
        if (contestAnswerReq.getIsAnswer())
            ++cor;

        ZonedDateTime now = ZonedDateTime.now();
        Double score = Double.valueOf(cor * 5);
        score += Math.abs((double) ChronoUnit.SECONDS.between(now, contestAnswerReq.getEndTime())) / 100000;

        AccountContestAnswerDto accountContestAnswerDto =
                new AccountContestAnswerDto(contestAnswerReq.getContestId(), accountName, score);

        kafkaProducerProvider.getKafkaProducer().send(
                new ProducerRecord<>("cseon.logs.contest", accountContestAnswerDto.toString()));

        this.upstageUserIndex(contestAnswerReq.getContestId(), accountName, contestAnswerReq.getProblemIdx());

        return true;
    }

    public Integer takeRedisUsernameIndex(Long contestId) {
        final String username = getAccountName();
        final String CONTEST_HASH_KEY = HASH_PREFIX_ID + contestId;

        this.InitUserIndex(username, CONTEST_HASH_KEY);
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();

        return Integer.parseInt(Objects.requireNonNull(
                hashOperations.get(CONTEST_HASH_KEY, username)));
    }

    private ContestMyRankingRes SearchMyRankingInfo(
            String redisId, String username, List<RankingRes> topRankingPlayer, ZSetOperations<String, String> ZSetOperations) {
        return ContestMyRankingRes.builder()
                .myRank(ZSetOperations.rank(redisId, username))
                .myScore(ZSetOperations.score(redisId, username))
                .isExistMeInLeaderboard(topRankingPlayer.stream()
                        .anyMatch(rankingRes -> rankingRes.getAccountNickname().equals(username)))
                .build();
    }


    private void InitMyRankingInRedis(
            String redisId, String username, ZSetOperations<String, String> ZSetOperations) {

        if (Objects.requireNonNull(redisTemplate.hasKey(redisId)).equals(false)
                || ZSetOperations.rank(redisId, username) == null)
            ZSetOperations.add(redisId, username, 0);
    }

    private void checkRedisCondition(Set<ZSetOperations.TypedTuple<String>> typedTuples) {
        if (Objects.requireNonNull(typedTuples).isEmpty()) {
            throw new CustomException(ErrorCode.CONTEST_NOT_EXIST_SERVER);
        }
    }

    private void InitUserIndex(String username, String hashContestId) {

        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();

        hashOperations.putIfAbsent(hashContestId, username, INIT_VALUE);
    }

    private void upstageUserIndex(Long contestId, String username, Integer contestQuestionIdx) {
        final String CONTEST_HASH_KEY = HASH_PREFIX_ID + contestId;
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        hashOperations.put(CONTEST_HASH_KEY, username, String.valueOf(contestQuestionIdx));
    }

    private List<RankingRes> SearchTopRankingPlayer(Set<ZSetOperations.TypedTuple<String>> typedTuples) {
        return typedTuples.stream()
                .map(tuple -> RankingRes.builder()
                        .accountNickname(tuple.getValue())
                        .accountScore(tuple.getScore())
                        .build())
                .collect(Collectors.toList());
    }

    private Integer floor(Double d) {
        return d.intValue();
    }
}
