package cseon.api.dto.layer;

import lombok.Getter;
import lombok.ToString;

@Getter
public class KakaoProfileDto {
    private Long id;
    private Properties properties;
    private KakaoAccount kakaoAccount;

    @Getter
    @ToString
    public static class KakaoAccount {
        private String email;
    }

    @Getter
    @ToString
    public static class Properties {
        private String nickname;
    }
}
