package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountDetailsRes {

    private final String accountRole;

    private final Integer accountSuccessCount;

    private final Integer usingBadgeId;

    @Builder
    public AccountDetailsRes(String accountRole, Integer accountSuccessCount, Integer usingBadgeId){
        this.accountRole = accountRole;
        this.accountSuccessCount = accountSuccessCount;
        this.usingBadgeId = usingBadgeId;
    }
}
