package cseon.api.controller;

import cseon.api.dto.response.ContestInfoRes;
import cseon.api.dto.response.ContestRes;
import cseon.api.dto.response.ContestResultRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.service.ContestOperationService;
import cseon.api.service.ContestRealTimeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contest")
@Tag(name = "대회", description = "대회 관련 API")
public class ContestController {

    private final ContestOperationService contestOperationService;

    private final ContestRealTimeService contestRealTimeService;

    @GetMapping
    public ResponseEntity<List<ContestRes>> takeAllContests() {
        return ResponseEntity.ok(contestOperationService.getAllContestRes());
    }

    @GetMapping("/{contestId}/valid-time")
    public ResponseEntity<String> canParticipateContest(@PathVariable("contestId") Long contestId){
        return ResponseEntity.ok(contestOperationService.canParticipateContestWithContestId(contestId));
    }

    @GetMapping("/{contestId}/ranking")
    public ResponseEntity<ContestInfoRes> test(@PathVariable("contestId") Long contestId) {
        return ResponseEntity.ok(contestRealTimeService.SearchRankingInfo(contestId));
    }

    @GetMapping("/{contestId}/question")
    public ResponseEntity<List<QuestionDto>> takeContestQuestionInfo(@PathVariable("contestId") Long contestId) {
        return ResponseEntity.ok(
                contestOperationService.searchContestQuestionInfo(contestId));
    }

    @GetMapping("/{contestId}/result")
    public ResponseEntity<ContestResultRes> takeContestResultWithWorkbookInfo(@PathVariable("contestId") Long contestId) {
        return ResponseEntity.ok(
                contestOperationService.takeContestResultWithContestInfo(
                        contestId, contestRealTimeService.SearchRankingInfo(contestId)));
    }
}
