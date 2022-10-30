package cseon.common.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserUtils {

    public static final Integer PASSWORD_SIZE = 10;
    public static final Integer RANDOM_KAKAO_NICKNAME = 5;

    public static String createRandomUserPassword() {
        return RandomStringUtils.randomNumeric(PASSWORD_SIZE);
    }

    public static String createRandomKakaoUserNickname(Long totalMember){
        return RandomStringUtils.randomAlphabetic(RANDOM_KAKAO_NICKNAME) + "#" + totalMember;
    }

    public static String createRandomKakaoAvatar(){
        return "1";
    }
}
