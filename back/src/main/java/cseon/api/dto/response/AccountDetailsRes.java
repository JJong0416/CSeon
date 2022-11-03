package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AccountDetailsRes {

    private final Boolean accountRole;

    private final Integer accountSuccessCount;

    private final String badgeName;

    private final List<WorkbookRes> workbooks;

    @Builder
    public AccountDetailsRes(
            Boolean accountRole, Integer accountSuccessCount, String badgeName, List<WorkbookRes> workbooks
    ) {
        this.accountRole = accountRole;
        this.accountSuccessCount = accountSuccessCount;
        this.badgeName = badgeName;
        this.workbooks = workbooks;
    }
}
