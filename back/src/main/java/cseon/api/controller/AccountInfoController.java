package cseon.api.controller;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.dto.response.AccountTypeRes;
import cseon.api.dto.response.BadgeRes;
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
public class AccountInfoController {

    private final AccountService accountService;

    /**
     * 유저가 마이페이지에 들어가서 정보를 확인한다.
     */
    @GetMapping("/mypage")
    public ResponseEntity<AccountDetailsRes> showMyPage() {
        return ResponseEntity.ok(accountService.takeMyPage());
    }

    /**
     * 메인페이지에서 유저의 타입을 확인한다.
     */
    @GetMapping("/accountInfo")
    public ResponseEntity<AccountTypeRes> getAccountInfo() {
        return ResponseEntity.ok(accountService.getAccountInfo());
    }

    /**
     * 유저가 마이페이지에 들어가서 어떤 벳지가 있는지 확인을 한다.
     */
    @GetMapping("/mypage/badge")
    public ResponseEntity<List<BadgeRes>> getAccountMyBadge() {
        // account 정보 가져오기
        return new ResponseEntity<>(accountService.getMyBadge(), HttpStatus.OK);
    }
}