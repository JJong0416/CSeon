package cseon.api.controller;

import cseon.api.dto.request.LoginReq;
import cseon.api.dto.response.TokenRes;
import cseon.api.service.AuthService;
import cseon.api.service.OAuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * 권한에 대한 Controller (Login 포함)
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "LoginController", description = "로그인 관련 API")
public class LoginController {

    private final AuthService authService;
    private final OAuthService oAuthService;

    @GetMapping("/login/kakao/{code}")
    public ResponseEntity<TokenRes> loginOrSignupFromKakao(@PathVariable String code) {
        var jwt = authService.createJwtString(oAuthService.kakaoLoginOrRegister(code));
        return new ResponseEntity<>(
                new TokenRes(jwt), authService.createJwtHttpHeader(jwt), HttpStatus.OK);
    }

    @GetMapping("/login/test")
    public ResponseEntity<TokenRes> test() {
        LoginReq loginReq = new LoginReq("jjong0416", "jjong0416@gmail.com");
        var jwt = authService.createJwtString(loginReq);
        return new ResponseEntity<>(
                new TokenRes(jwt), authService.createJwtHttpHeader(jwt), HttpStatus.OK);
    }
}