package cseon.api.controller;

import cseon.api.dto.request.WorkbookRequestReq;
import cseon.api.service.WorkbookService;
import cseon.domain.Workbook;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workbook")
@RequiredArgsConstructor
@Tag(name = "문제집", description = "문제집 관련 api입니다")
public class WorkbookController {

    private final WorkbookService workbookService;

    @Operation(summary = "전체 문제집", description = "전체 문제집을 가져오는 메소드입니다.")
    @GetMapping
    public ResponseEntity<List<Workbook>> workbookList() {
        return ResponseEntity.ok().body(workbookService.getAllWorkbook());
    }

    @Operation(summary = "특정 문제집", description = "특정 문제집만 가져오는 메소드입니다.")
    @GetMapping(value = "/{workbookId}")
    public ResponseEntity<Workbook> getWorkbook(@Parameter @PathVariable("workbookId") Long workbookId) {
        return ResponseEntity.ok().body(workbookService.getWorkbook(workbookId));
    }

    @Operation(summary = "문제집 만들기", description = "문제집을 만드는 메소드입니다.")
    @PostMapping
    public ResponseEntity<HttpStatus> newWorkbook(@Parameter @RequestBody WorkbookRequestReq workbookRequestReq) {
        workbookService.createWorkbook(workbookRequestReq);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "문제집 수정하기", description = "문제집을 수정하는 메소드입니다.")
    @PatchMapping
    public ResponseEntity<HttpStatus> changeWorkbook(
            @Parameter @RequestBody WorkbookRequestReq workbookRequestReq, Long workbookId
    ) {
        workbookService.modifyWorkbook(workbookRequestReq, workbookId);
        return ResponseEntity.ok().build();
    }
}
