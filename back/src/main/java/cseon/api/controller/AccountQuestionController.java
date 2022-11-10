package cseon.api.controller;

import cseon.api.dto.request.QuestionRequestReq;
import cseon.api.service.QuestionOperationService;
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
@RequestMapping("/api/request/question")
@Tag(name = "RequestQuestion", description = "요청 문제 관련 API")
public class AccountQuestionController {

    private final QuestionOperationService questionOperationService;

    /**
     * 유저가 추가하고싶은 문제를 추가해서 요청한다.
     */
    @PostMapping
    public ResponseEntity<HttpStatus> requestQuestionFromAccount(@Valid @RequestBody QuestionRequestReq questionRequestReq) {
        questionOperationService.requestQuestionAddBoard(questionRequestReq);
        return ResponseEntity.ok().build();
    }
}
