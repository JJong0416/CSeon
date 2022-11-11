package cseon.api.controller;

import cseon.api.dto.request.ContestAnswerReq;
import cseon.api.dto.response.ContestInfoRes;
import cseon.api.dto.response.ContestRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.service.ContestService;
import cseon.common.constant.ControllerConstant;
import cseon.common.utils.MessageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contest")
@Tag(name = "대회", description = "대회 관련 API")
public class ContestController extends ControllerConstant{

    private final ContestService contestService;

    @GetMapping("/{contestId}/ranking")
    public ResponseEntity<ContestInfoRes> test(@PathVariable("contestId") Long contestId) {
        return ResponseEntity.ok(contestService.SearchRankingInfo(contestId));
    }

    @GetMapping("")
    public ResponseEntity<List<ContestRes>> takeAllContests() {
        return ResponseEntity.ok(contestService.getAllContestRes());
    }

    @GetMapping("/{contestId}/question")
    public ResponseEntity<List<QuestionDto>> takeContestQuestionInfo(@PathVariable("contestId") Long contestId) {
        return ResponseEntity.ok(contestService.searchContestQuestionInfo(contestId));
    }

    @PostMapping("/submit")
    public ResponseEntity<MessageResponse> pushAccountContestAnswer(@RequestBody ContestAnswerReq contestAnswerReq){
        boolean res = contestService.pushAccountContestAnswer(contestAnswerReq);
        return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.of(HttpStatus.OK, res ? SUCCESS : FAIL));
    }
}
