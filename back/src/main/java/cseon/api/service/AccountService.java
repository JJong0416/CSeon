package cseon.api.service;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.dto.response.WorkbookRes;
import cseon.api.repository.AccountRepository;
import cseon.api.repository.WorkbookRepository;
import cseon.domain.Account;
import cseon.domain.Workbook;
import lombok.RequiredArgsConstructor;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final WorkbookRepository workbookRepository;

    @Transactional(readOnly = true)
    public AccountDetailsRes takeMyPage() {
        Account account = accountRepository.findById(1L).get(); // TODO: 2022-11-01 Account 계정 가져오기

        // 1. 해당 계정이 생성한 문제집들을 가져온다.
        List<Workbook> workbooks = workbookRepository.findWorkbooksByWorkbookCreatedBy(account.getAccountId());

        // 2. Workbook을 WorkbookRes로 DTO로 옮겨준다.
        List<WorkbookRes> workbookRes = workbooks.stream()
                .map(workbook -> WorkbookRes.builder()
                        .workbookId(workbook.getWorkbookId())
                        .workbookName(workbook.getWorkbookName())
                        .workbookCreateBy(workbook.getWorkbookCreatedBy())
                        .build())
                .collect(Collectors.toList());

        // 3. 그 후, 필요로 하는 정보들을 Response에 담아 전송한다
        return AccountDetailsRes.builder()
                .accountRole(account.getAccountRole())
                .accountSuccessCount(account.getSuccessCount())
                .usingBadgeId(account.getUsingBadgeId())
                .workbooks(workbookRes)
                .build();
    }
}
