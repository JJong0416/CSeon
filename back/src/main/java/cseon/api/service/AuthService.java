package cseon.api.service;

import cseon.api.dto.request.LoginReq;
import cseon.common.jwt.JwtFilter;
import cseon.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    // JwtString 만들면서 Security에도 정보를 넣는다.
    public String createJwtString(LoginReq loginReq) {
        return jwtTokenProvider.createToken(getAuthentication(loginReq));
    }

    public HttpHeaders createJwtHttpHeader(String jwt) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return httpHeaders;
    }

    // SecurityContextHolder에 user 정보의 토큰을 넣고 반환
    private Authentication getAuthentication(LoginReq loginReq) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginReq.getUserId(), loginReq.getUserPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }
}
