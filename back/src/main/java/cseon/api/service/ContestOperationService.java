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
public class ContestOperationService{

    private final ContestRepository contestRepository;
    private final WorkbookQuestionRepository workbookQuestionRepository;
    private final QuestionSearchService questionSearchService;

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
            ctList.add(ContestRes.builder()
                    .contestId(c.getContestId())
                    .contestTitle(c.getContestName())
                    .startTime(c.getContestStart())
                    .endTime(c.getContestEnd())
                    .isExpired(check)
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
            questionDtoList.add(questionSearchService.takeDetailsQuestion(l.getQuestionId().getQuestionId()));
        }
        return questionDtoList;
    }
}
