package cseon.api.dto.request;

import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter @ToString
public class LoginReq {

    @Pattern(regexp = "[a-z0-9]{6,15}")
    private final String userId;

    @NotBlank
    @Size(min = 6, max = 100)
    private final String userPassword;

    public LoginReq(
            String userId, String userPassword
    ) {
        this.userId = userId;
        this.userPassword = userPassword;
    }
}
