package cseon.api.service;

import cseon.api.dto.response.ContestInfoRes;
import cseon.api.dto.response.ContestRes;
import cseon.api.dto.response.ContestResultRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.ContestRepository;
import cseon.api.repository.WorkbookQuestionRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Contest;
import cseon.domain.WorkbookQuestion;
import cseon.domain.type.ContestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContestOperationService {
    private final ContestRepository contestRepository;
    private final WorkbookQuestionRepository workbookQuestionRepository;
    private final QuestionSearchService questionSearchService;

    @Transactional(readOnly = true)
    public String canParticipateContestWithContestId(Long contestId) {

        Contest findContest = takeDetailsContest(contestId);

        return checkContestStatus(findContest.getContestStart(), findContest.getContestEnd());
    }

    @Transactional(readOnly = true)
    public ContestResultRes takeContestResultWithContestInfo(Long contestId, ContestInfoRes contestInfoRes) {

        Contest findContest = takeDetailsContest(contestId);

        return ContestResultRes.builder()
                .contestId(contestId)
                .contestName(findContest.getContestName())
                .contestInfoRes(contestInfoRes)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ContestRes> getAllContestRes() {
        List<Contest> contests = contestRepository.findAllContests()
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.CONTEST_NOT_FOUND);
                });

        return contests.stream()
                .map(contest -> ContestRes.builder()
                        .contestId(contest.getContestId())
                        .contestName(contest.getContestName())
                        .isExpired(checkContestStatus(contest.getContestStart(), contest.getContestEnd()))
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<QuestionDto> searchContestQuestionInfo(Long contestId) {

        Contest findContest = takeDetailsContest(contestId);

        List<WorkbookQuestion> questions =
                workbookQuestionRepository.findWorkbookQuestionsByWorkbookId(findContest.getWorkbookId())
                        .orElseThrow(() -> {
                            throw new CustomException(ErrorCode.QUESTION_NOT_FOUND);
                        });

        return questions.stream()
                .map(question -> questionSearchService.takeDetailsQuestion(
                        question.getQuestionId().getQuestionId()))
                .collect(Collectors.toList());
    }

    private Contest takeDetailsContest(Long contestId) {
        return contestRepository.findContestByContestId(contestId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.CONTEST_NOT_FOUND);
        });
    }

    private String checkContestStatus(ZonedDateTime startTime, ZonedDateTime endTime) {
        final ZonedDateTime checkTime = ZonedDateTime.now();

        if (checkTime.isBefore(startTime)) {
            return ContestStatus.BEFORE_CONTEST.getDesc();
        } else if (checkTime.isAfter(startTime) && checkTime.isBefore(endTime)) {
            return ContestStatus.IN_PROGRESS.getDesc();
        } else {
            return ContestStatus.AFTER_CONTEST.getDesc();
        }
    }
}
