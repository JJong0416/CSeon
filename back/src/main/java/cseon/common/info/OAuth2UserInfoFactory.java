package cseon.common.info;


import cseon.common.info.impl.GoogleOAuth2UserInfo;
import cseon.common.info.impl.KakaoOAuth2UserInfo;
import cseon.common.info.impl.NaverOAuth2UserInfo;
import cseon.domain.ProviderType;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case NAVER: return new NaverOAuth2UserInfo(attributes);
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
