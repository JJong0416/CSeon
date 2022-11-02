package cseon.api.controller;

import cseon.api.dto.response.BadgeResponseDto;
import cseon.api.service.UserService;
import cseon.domain.Account;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "User", description = "사용자 관련 API")
public class UserController {
   private final UserService userService;
   
    @GetMapping("/mypage/badge")
    public ResponseEntity<List<BadgeResponseDto>> getMyBadge(){
        // account 정보 가져오기
        Account ac = new Account(1L, false, 1, 1L);
        return new ResponseEntity<>(userService.getMyBadge(ac), HttpStatus.OK);
    }
}
