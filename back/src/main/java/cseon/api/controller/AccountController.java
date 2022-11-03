package cseon.api.controller;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.dto.response.BadgeResponseRes;
import cseon.api.service.AccountService;
import cseon.domain.Account;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static cseon.common.utils.SecurityUtils.getCurrentUsername;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "MyPage", description = "계정 관리 API")
public class AccountController {

    private final AccountService accountService;

    // TODO: 2022-11-01 JWT 로그인 기능 완성 시, Account 계정으로 넣기
    @GetMapping("/mypage")
    public ResponseEntity<AccountDetailsRes> showMyPage() {
        System.out.println(getCurrentUsername());
        return ResponseEntity.ok(accountService.takeMyPage());
    }

    @GetMapping("/mypage/badge")
    public ResponseEntity<List<BadgeResponseRes>> getMyBadge() {
        // account 정보 가져오기
        Account ac = new Account(1L, false, 1, 1L);
        return new ResponseEntity<>(accountService.getMyBadge(ac), HttpStatus.OK);
    }
}