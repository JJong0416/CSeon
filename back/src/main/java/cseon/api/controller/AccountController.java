package cseon.api.controller;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.dto.response.BadgeResponseRes;
import cseon.api.service.AccountService;
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
@Tag(name = "MyPage", description = "계정 관리 API")
public class AccountController {

    private final AccountService accountService;

    /**
     * 유저가 마이페이지에 들어가서 정보를 확인한다.
     */
    @GetMapping("/mypage")
    public ResponseEntity<AccountDetailsRes> showMyPage() {
        return ResponseEntity.ok(accountService.takeMyPage());
    }

    /**
     * 유저가 마이페이지에 들어가서 어떤 벳지가 있는지 확인을 한다.
     */
    @GetMapping("/mypage/badge")
    public ResponseEntity<List<BadgeResponseRes>> getAccountMyBadge() {
        // account 정보 가져오기
        return new ResponseEntity<>(accountService.getMyBadge(), HttpStatus.OK);
    }
}