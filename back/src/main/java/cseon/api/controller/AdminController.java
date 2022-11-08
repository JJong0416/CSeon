package cseon.api.controller;

import cseon.api.dto.request.QuestionRequestReq;
import cseon.api.dto.response.QuestionDto;
import cseon.api.service.AdminService;
import cseon.common.constant.ControllerConstant;
import cseon.common.utils.DtoResponse;
import cseon.common.utils.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@Tag(name = "Admin Function", description = "관리자 관련 API")
public class AdminController extends ControllerConstant {

    private final AdminService adminService;

    /**
     * 요청된 문제 리스트 가져오기
     */
    @Operation(summary = "요청 문제 리스트", description = "요청된 문제들의 리스트를 전부 가져옵니다.")
    @GetMapping("/request")
    public ResponseEntity<?> getRequestQuestionList() {
        List<QuestionDto> res = adminService.getRequestQuestionList();
        return ResponseEntity.status(HttpStatus.OK).body(DtoResponse.of(HttpStatus.OK, SUCCESS, res));
    }

    /**
     * 요청된 문제 디테일 가져오기
     */
    @Operation(summary = "요청 문제 상세 정보", description = "선택한 요청 문제에 대한 상세 정보를 가져옵니다.")
    @GetMapping("/request/{requestQuestionId}")
    public ResponseEntity<?> getRequestQuestion(@PathVariable("requestQuestionId") Long requestQuestionId) {
        QuestionDto res = adminService.getRequestQuestion(requestQuestionId);
        return ResponseEntity.status(HttpStatus.OK).body(DtoResponse.of(HttpStatus.OK, SUCCESS, res));
    }

    /**
     * 문제 등록 허가
     */
    @Operation(summary = "등록 허가", description = "요청된 문제를 정식 문제로 채택합니다.")
    @PostMapping("/request")
    public ResponseEntity<?> allowRequestQuestionFromAccount(@RequestBody QuestionRequestReq questionRequestReq) {
        boolean res = adminService.allowQuestion(questionRequestReq);
        return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.of(HttpStatus.OK, res ? SUCCESS : FAIL));
    }

    /**
     * 문제 변경
     */
    @Operation(summary = "문제 변경", description = "정식 문제의 변경 사항을 적용시킵니다.")
    @PutMapping("/question")
    public ResponseEntity<?> modifyQuestion(@RequestBody QuestionRequestReq questionRequestReq) {
        boolean res = adminService.modifyQuestion(questionRequestReq);
        return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.of(HttpStatus.OK, res ? SUCCESS : FAIL));
    }
}