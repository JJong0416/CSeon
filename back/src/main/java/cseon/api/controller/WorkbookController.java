package cseon.api.controller;

import cseon.api.dto.request.WorkbookRequestDto;
import cseon.api.service.WorkbookService;
import cseon.domain.Workbook;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.media.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.hibernate.annotations.Fetch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="문제집", description = "문제집 관련 api입니다")
@RestController
@RequestMapping("/v1/api/workbook")
public class WorkbookController {
    @Autowired
    WorkbookService workbookService;

    @Operation(summary = "전체 문제집", description = "전체 문제집을 가져오는 메소드입니다.")
    @GetMapping(value = "")
    public ResponseEntity<List> workbookList() {
        List<Workbook> wb = workbookService.getAllWorkbook();
        return ResponseEntity.ok().body(wb);
    }

    @Operation(summary = "특정 문제집", description = "특정 문제집만 가져오는 메소드입니다.")
    @GetMapping(value = "/{workbookId}")
    public ResponseEntity<Workbook> getWorkbook(@Parameter @PathVariable("workbookId") int workbookId){
        return ResponseEntity.ok().body(workbookService.getWorkbook(workbookId));
    }

    @Operation(summary = "문제집 만들기", description = "문제집을 만드는 메소드입니다.")
    @PostMapping(value = "")
    public ResponseEntity<HttpStatus> newWorkbook(@Parameter @RequestBody WorkbookRequestDto workbookRequestDto) {
        workbookService.createWorkbook(workbookRequestDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "문제집 수정하기", description = "문제집을 수정하는 메소드입니다.")
    @PatchMapping(value = "")
    public ResponseEntity<HttpStatus> changeWorkbook(@Parameter @RequestBody WorkbookRequestDto workbookRequestDto, int workbookId){
        workbookService.modifyWorkbook(workbookRequestDto, workbookId);
        return ResponseEntity.ok().build();
    }
}
