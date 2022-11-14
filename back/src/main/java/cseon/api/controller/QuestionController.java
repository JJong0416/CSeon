package cseon.api.controller;

import cseon.api.dto.request.AnswerRequestReq;
import cseon.api.dto.response.LogRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.dto.response.QuestionRes;
import cseon.api.service.QuestionOperationService;
import cseon.api.service.QuestionSearchService;
import cseon.common.constant.ControllerConstant;
import cseon.common.utils.DtoResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
@Tag(name = "질문", description = "문제 관련 API")
public class QuestionController extends ControllerConstant {

    private final QuestionOperationService questionOperationService;
    private final QuestionSearchService questionSearchService;

    /**
     * 클라이언트가 요청한 Question을 가지고 온다. 유저와 어드민 둘 다 접근할 수 있다.
     */
    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionDto> takeQuestionWithQuestionId(@PathVariable("questionId") Long questionId) {
        return new ResponseEntity<>(questionSearchService.takeDetailsQuestion(questionId), HttpStatus.OK);
    }

    /**
     * 클라이언트가 어떤 것도 입력하지 않는다면, 전체 문제를 가지고 온다.
     */
    @GetMapping("/all")
    public ResponseEntity<List<QuestionRes>> takeAllQuestion() {
        return ResponseEntity.ok(questionSearchService.takeAllQuestion());
    }


    /**
     * 클라이언트가 키워드를 입력하면, 키워드에 맞춰서 문제들을 가지고 온다.
     */
    @GetMapping("/keyword/{keyword}")
    public ResponseEntity<List<QuestionRes>> takeQuestionWithKeyword(@PathVariable("keyword") String keyword) {
        return ResponseEntity.ok(questionSearchService.takeQuestionWithKeyword(keyword));
    }

    /**
     * 클라이언트가 라벨을 입력하면, 키워드에 맞춰서 모든 문제들을 가지고 온다.
     */
    @GetMapping("/label/{label}")
    public ResponseEntity<List<QuestionRes>> takeQuestionWithLabel(@PathVariable("label") String label) {
        return ResponseEntity.ok(questionSearchService.takeQuestionWithLabel(label));
    }


    /**
     * 클라이언트가 라벨과 키워드를 입력하면, 해당 라벨과 키워드에 맞춰서 문제들을 가지고 온다.
     */
    @GetMapping("/{label}/{keyword}")
    public ResponseEntity<List<QuestionRes>> takeQuestionsWithInfo(@PathVariable("label") String label,
                                                                   @PathVariable("keyword") String keyword) {
        return ResponseEntity.ok(questionSearchService.takeQuestionsWithKeywordAndLabel(keyword, label));
    }

    /**
     * 유저들이 푼 문제들을 기록한다.
     */
    @PostMapping("/logs")
    public ResponseEntity<HttpStatus> selectAnswer(@Valid @RequestBody AnswerRequestReq answerRequestReq) {
        questionOperationService.selectAnswer(answerRequestReq);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/logs/{questionId}")
    public ResponseEntity<List<LogRes>> getLogs(@PathVariable("questionId") Long questionId){
        return ResponseEntity.ok(questionOperationService.getLogs(questionId));
    }
}
