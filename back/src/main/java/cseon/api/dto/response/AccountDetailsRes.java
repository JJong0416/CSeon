package cseon.api.dto.response;

import cseon.domain.type.AccountRole;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AccountDetailsRes {

    private final AccountRole accountRole;

    private final Integer accountSuccessCount;

    private final Long usingBadgeId;

    private final List<WorkbookRes> workbooks;

    @Builder
    public AccountDetailsRes(
            AccountRole accountRole, Integer accountSuccessCount, Long usingBadgeId, List<WorkbookRes> workbooks
    ) {
        this.accountRole = accountRole;
        this.accountSuccessCount = accountSuccessCount;
        this.usingBadgeId = usingBadgeId;
        this.workbooks = workbooks;
    }
}
