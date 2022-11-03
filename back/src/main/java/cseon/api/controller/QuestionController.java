package cseon.api.controller;

import cseon.api.dto.request.AnswerRequestReq;
import cseon.api.dto.request.QuestionRequestReq;
import cseon.api.dto.response.QuestionDto;
import cseon.api.dto.response.QuestionRes;
import cseon.api.service.QuestionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/question")
@Tag(name = "Question", description = "문제 관련 API")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<HttpStatus> requestQuestion(@Valid @RequestBody QuestionRequestReq questionRequestReq) {
        questionService.requestQuestionAddBoard(questionRequestReq);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logs")
    public ResponseEntity<HttpStatus> selectAnswer(@Valid @RequestBody AnswerRequestReq answerRequestReq) {
        questionService.selectAnswer(answerRequestReq);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionDto> getQuestion(@PathVariable("questionId") Long questionId) {
        return new ResponseEntity<>(questionService.getQuestion(questionId), HttpStatus.OK);
    }

    @GetMapping("/{label}/{keyword}")
    public ResponseEntity<List<QuestionRes>> takeQuestionsWithInfo(@PathVariable("label") String label,
                                                                   @PathVariable("keyword") String keyword
    ) {
        return ResponseEntity.ok(questionService.takeQuestionsWithKeywordAndLabel(keyword, label));
    }

}
