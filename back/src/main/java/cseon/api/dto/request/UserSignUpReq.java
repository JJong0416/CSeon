package cseon.api.dto.request;

import cseon.domain.PlatformType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
public class UserSignUpReq {

    @Pattern(regexp = "[a-z0-9]{6,15}")
    private final String userId;

    @NotBlank
    @Size(min = 6, max = 100)
    private String userPassword;

    @Email
    private final String userEmail;

    @NotBlank
    @Size(min = 4, max = 10)
    private final String userNickname;


    private final Integer userPoint = 1000;

    @Setter
    private PlatformType platformType;

    public void dtoEncodePassword(String encodePassword) {
        this.userPassword = encodePassword;
    }

    @Builder
    public UserSignUpReq(
            String userId, String userPassword, String userEmail, String userNickname
    ) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.platformType = PlatformType.DOMAIN;
    }
}
