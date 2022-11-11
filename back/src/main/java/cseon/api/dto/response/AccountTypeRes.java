package cseon.api.dto.response;

import cseon.domain.type.AccountRole;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountTypeRes {
    private final AccountRole accountRole;
    private final String accountName;

    @Builder
    public AccountTypeRes(
            AccountRole accountRole, String accountName) {
        this.accountRole = accountRole;
        this.accountName = accountName;
    }
}
