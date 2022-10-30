package cseon.api.controller;

import cseon.api.dto.layer.RequestQuestionDto;
import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.service.AdminService;
import cseon.common.utils.DtoResponse;
import cseon.common.utils.MessageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Tag(name = "Admin Function", description = "관리자 관련 API")
public class AdminController {

    private final AdminService adminService;

    /**
     * 요청된 문제 리스트 가져오기
     */
    @GetMapping("/request")
    public ResponseEntity<?> getRequestQuestionList(){
        List<RequestQuestionDto> res = adminService.getRequestQuestionList();
        return ResponseEntity.status(HttpStatus.OK).body(DtoResponse.of(HttpStatus.OK, "Success", res));
    }

    /**
     * 요청된 문제 디테일 가져오기
     * @param requestQuestionId
     */
    @GetMapping("/request/{requestQuestionId}")
    public ResponseEntity<?> getRequestQuestion(@PathVariable("requestQuestionId") Long requestQuestionId){
        RequestQuestionDto res = adminService.getRequestQuestion(requestQuestionId);
        return ResponseEntity.status(HttpStatus.OK).body(DtoResponse.of(HttpStatus.OK, "Success", res));
    }

    /**
     * 요청 문제 등록 허가
     * @param requestQusetionId
     */
    @PostMapping("/request/{requestQuestionId}")
    public ResponseEntity<?> allowQuestion(@PathVariable("requestQuestionId") Long requestQusetionId, @RequestBody QuestionRequestDto questionRequestDto){
        boolean res = adminService.allowQuestion(requestQusetionId, questionRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.of(HttpStatus.OK, res ? "Success" : "Fail"));
    }

    /**
     * 문제 변경
     */
    @PutMapping("/question")
    public ResponseEntity<?> modifyQuestion(@RequestBody QuestionRequestDto questionRequestDto){
        boolean res = adminService.modifyQuestion(questionRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.of(HttpStatus.OK, res ? "Success" : "Fail"));
    }
}
