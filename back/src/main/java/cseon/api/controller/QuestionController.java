package cseon.api.controller;

import cseon.api.dto.request.AnswerRequestDto;
import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.service.QuestionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
@Tag(name = "Question", description = "문제 관련 API")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<HttpStatus> requestQuestion(@Valid @RequestBody QuestionRequestDto questionRequestDto) {
        questionService.requestQuestionAddBoard(questionRequestDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logs")
    public ResponseEntity<HttpStatus> selectAnswer(@Valid @RequestBody AnswerRequestDto answerRequestDto){
        questionService.selectAnswer(answerRequestDto);
        return ResponseEntity.ok().build();
    }

}
