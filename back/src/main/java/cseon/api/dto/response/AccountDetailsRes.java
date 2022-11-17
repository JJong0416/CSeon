package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class AccountDetailsRes {

    private final Integer accountSuccessCount;

    private final String badgeName;

    private final List<WorkbookRes> workbooks;

    private final List<Long> correctQuestion;

    private final List<Long> wrongQuestion;

    @Builder
    public AccountDetailsRes(Integer accountSuccessCount, String badgeName, List<WorkbookRes> workbooks,
                             List<Long> correct, List<Long> wrong
    ) {

        this.accountSuccessCount = accountSuccessCount;
        this.badgeName = badgeName;
        this.workbooks = workbooks;
        this.correctQuestion = correct;
        this.wrongQuestion = wrong;
    }
}
