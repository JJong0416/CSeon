package cseon.api.controller;

import cseon.api.dto.response.TokenRes;
import cseon.api.service.AuthService;
import cseon.api.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static cseon.common.utils.SecurityUtils.getCurrentUsername;


/**
 * 권한에 대한 Controller (Login 포함)
 */
@RestController
@RequestMapping("/v1/api")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final OAuthService oAuthService;


    @GetMapping("/login/kakao/{code}")
    public ResponseEntity<TokenRes> loginOrSignupFromKakao(@PathVariable String code) {
        String jwt = authService.createJwtString(oAuthService.kakaoLoginOrRegister(code));
        System.out.println(getCurrentUsername());
        return new ResponseEntity<>(
                new TokenRes(jwt), authService.createJwtHttpHeader(jwt), HttpStatus.OK);
    }

    @GetMapping("/test1")
    public String test1() {
        return "Perfect Jenkins-Test";
    }

}