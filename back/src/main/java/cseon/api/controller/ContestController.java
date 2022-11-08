package cseon.api.controller;

import cseon.api.dto.response.ContestInfoRes;
import cseon.api.service.ContestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contest")
@Tag(name = "대회", description = "대회 관련 API")
public class ContestController {

    private final ContestService contestService;

    @GetMapping("/{contestId}/ranking")
    public ResponseEntity<ContestInfoRes> test(@PathVariable("contestId") Long contestId){
        return ResponseEntity.ok(contestService.SearchRankingInfo(contestId));
    }
}
