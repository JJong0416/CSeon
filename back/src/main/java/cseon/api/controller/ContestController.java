package cseon.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contest")
public class ContestController {

    @GetMapping("/{contestId}/ranking")
    public String test(@PathVariable("contestId") Long contestId){
        return "111";
    }
}
