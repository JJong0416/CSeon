package cseon.api.controller;

import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.dto.response.QuestionDto;
import cseon.api.service.QuestionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/question")
@Tag(name = "Question", description = "문제 관련 API")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<HttpStatus> requestQuestion(@Valid @RequestBody QuestionRequestDto questionRequestDto) {
        questionService.requestQuestionAddBoard(questionRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionDto> getQuestion(@PathVariable("questionId") Long questionId){
      return new ResponseEntity<>(questionService.getQuestion(questionId), HttpStatus.OK);
    }
}
