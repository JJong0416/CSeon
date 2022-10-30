package cseon.domain;

import lombok.Getter;

@Getter
public enum PlatformType {

    DOMAIN("octopus", 0),
    KAKAO("kakao", 1),
    GOOGLE("google", 2);

    private final String desc;
    private final Integer stateCode;

    PlatformType(String desc, Integer stateCode) {
        this.desc = desc;
        this.stateCode = stateCode;
    }
}
