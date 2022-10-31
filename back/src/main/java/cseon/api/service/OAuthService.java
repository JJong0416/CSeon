package cseon.api.service;

import cseon.api.dto.layer.KakaoProfileDto;
import cseon.api.dto.request.LoginReq;
import cseon.api.dto.request.UserSignUpReq;
import cseon.api.repository.UserRepository;
import cseon.common.exception.CustomException;
import cseon.domain.PlatformType;
import cseon.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Optional;

import static cseon.common.utils.UserUtils.createRandomKakaoUserNickname;


@Service
@RequiredArgsConstructor
public class OAuthService {

    private final UserRegisterService userRegisterService;
    private final UserRepository userRepository;


    @Value("${kakao.client-id}")
    private String client_id;

    @Value("${kakao.redirect-uri}")
    private String redirect_uri;

    @Value("${kakao.client-secret}")
    private String client_secret;

    @Value("${kakao.token-uri}")
    private String token_uri;

    public LoginReq kakaoLoginOrRegister(String code) {
        // 카카오 정보 꺼내오기
        KakaoProfileDto kakaoProfile = getKakaoProfile(code);

        String userId = String.valueOf(kakaoProfile.getId());
        String userEmail = kakaoProfile.getKakao_account().getEmail();

        // 존재한다면 LoginReq로 반환해준다
        Optional<User> kakaoUser = findKakaoUser(userId);
        if (kakaoUser.isPresent()) {
            return new LoginReq(kakaoUser.get().getUserId(),userEmail);
        }

        // 존재하지 않으면 생성 + 저장 + LoginReq 반환
        UserSignUpReq userSignUpReq = UserSignUpReq.builder()
                .userId(userId)
                .userPassword(userEmail)
                .userEmail(userEmail)
                .userNickname(createRandomKakaoUserNickname(15L))
                .build();

        userSignUpReq.setPlatformType(PlatformType.KAKAO);
        userRegisterService.signup(userSignUpReq);

        return new LoginReq(userSignUpReq.getUserId(), userEmail);
    }


    /* 현재 userRepository에 해당하는 카카오 아이디 찾아오기 */
    @Transactional(readOnly = true)
    protected Optional<User> findKakaoUser(String userId) throws CustomException {
        return userRepository.findUserByUserIdAndPlatformType(userId, PlatformType.KAKAO);
    }

    private KakaoProfileDto getKakaoProfile(String code) {
        return getKakaoProfileWithAccessToken(getKakaoAccessToken(code));
    }

    /* 액세스 토큰(인가)을 가지고 카카오 프로필을 가지고 오는 작업 */
    private KakaoProfileDto getKakaoProfileWithAccessToken(String accessToken) {

        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();

        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);

        ResponseEntity<KakaoProfileDto> exchange = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoRequest,
                KakaoProfileDto.class
        );

        return exchange.getBody();
    }

    /* 카카오 로그인(인증)을 통해 accessToken 가지고 오기*/
    private String getKakaoAccessToken(String code) {

        final String ACCESS_TOKEN = "access_token";

        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();

        // HttpHeader 오브젝트 생성
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client_id);
        params.add("redirect_uri", redirect_uri);
        params.add("code", code);
        params.add("client_secret", client_secret);

        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params, headers);

        ResponseEntity<HashMap> responseEntity = restTemplate.exchange(
                token_uri,
                HttpMethod.POST,
                kakaoRequest,
                HashMap.class
        );
        return (String) responseEntity.getBody().get(ACCESS_TOKEN);
    }
}
