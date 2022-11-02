package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class AccountSignUpReq {


    @Pattern(regexp = "[a-z0-9]{6,15}")
    private final String accountName;

    @NotBlank
    private final Boolean accountRole = false;

    @NotNull
    private final Integer accountSuccessCount = 0;

    @NotNull
    private final Long usingBadgeId = 0L;

    @Builder
    public AccountSignUpReq(String accountName) {
        this.accountName = accountName;
    }
}
