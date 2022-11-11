package cseon.api.dto.request;

import cseon.domain.type.AccountRole;
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
    private final AccountRole accountRole;

    @NotNull
    private final Integer accountSuccessCount;

    @NotNull
    private final Long usingBadgeId;

    @Builder
    public AccountSignUpReq(String accountName) {
        this.accountName = accountName;
        this.accountRole = AccountRole.USER;
        this.accountSuccessCount = 0;
        this.usingBadgeId = 0L;
    }
}
