package cseon.api.controller;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.service.AccountService;
import cseon.domain.Account;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
@Tag(name = "MyPage", description = "계정 관리 API")
public class AccountDetailController {

    private final AccountService accountService;

    // TODO: 2022-11-01 JWT 로그인 기능 완성 시, Account 계정으로 넣기
    @GetMapping
    public ResponseEntity<AccountDetailsRes> showMyPage(){
        return ResponseEntity.ok(accountService.takeMyPage());
    }
}
