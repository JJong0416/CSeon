package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class LoginReq {

    @Pattern(regexp = "[a-z0-9]{6,15}")
    private final String accountName;

    @NotBlank
    private final String accountEmail;

    @Builder
    public LoginReq(String accountName, String accountEmail) {
        this.accountName = accountName;
        this.accountEmail = accountEmail;
    }
}
