package cseon.api.controller;

import cseon.api.dto.request.AnswerRequestReq;
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
@RequestMapping("/api/question")
@Tag(name = "Question", description = "문제 관련 API")
public class QuestionController {

    private final QuestionService questionService;

    /** 클라이언트가 요청한 Question을 가지고 온다. 유저와 어드민 둘 다 접근할 수 있다. */
    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionDto> getQuestion(@PathVariable("questionId") Long questionId) {
        return new ResponseEntity<>(questionService.getQuestion(questionId), HttpStatus.OK);
    }

    /** 클라이언트가 라벨과 키워드를 입력하면, 해당 라벨과 키워드에 맞춰서 문제들을 가지고 온다. */
    @GetMapping("/{label}/{keyword}")
    public ResponseEntity<List<QuestionRes>> takeQuestionsWithInfo(@PathVariable("label") String label,
                                                                   @PathVariable("keyword") String keyword) {
        return ResponseEntity.ok(questionService.takeQuestionsWithKeywordAndLabel(keyword, label));
    }

    /** 유저들이 푼 문제들을 기록한다. */
    @PostMapping("/logs")
    public ResponseEntity<HttpStatus> selectAnswer(@Valid @RequestBody AnswerRequestReq answerRequestReq) {
        questionService.selectAnswer(answerRequestReq);
        return ResponseEntity.ok().build();
    }
}
