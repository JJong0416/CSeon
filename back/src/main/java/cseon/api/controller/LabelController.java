package cseon.api.controller;

import cseon.api.service.LabelService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/label")
@Tag(name = "질문", description = "문제 관련 API")
public class LabelController {

    private final LabelService labelService;

    @GetMapping
    public ResponseEntity<String> takeAllLabel(){
        return ResponseEntity.ok(labelService.takeAllLabels());
    }


}
