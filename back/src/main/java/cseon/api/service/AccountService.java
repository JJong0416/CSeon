package cseon.api.service;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.dto.response.AccountTypeRes;
import cseon.api.dto.response.BadgeRes;
import cseon.api.dto.response.WorkbookRes;
import cseon.api.repository.*;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static cseon.common.utils.SecurityUtils.getAccountName;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final WorkbookRepository workbookRepository;
    private final AccountBadgeRepository accountBadgeRepository;
    private final BadgeRepository badgeRepository;
    private final SolvedRepository solvedRepository;


    @Transactional(readOnly = true, rollbackFor = NullPointerException.class)
    public AccountDetailsRes takeMyPage() {

        Account account = hasAccountWithAccountName(getAccountName());

        // 1. 해당 계정이 생성한 문제집들을 가져온다.
        List<Workbook> workbooks = workbookRepository.findWorkbooksByWorkbookCreatedBy(account.getAccountName());

        // 2. Workbook을 WorkbookRes로 DTO로 옮겨준다.
        List<WorkbookRes> workbookRes = workbooks.stream()
                .map(workbook -> WorkbookRes.builder()
                        .workbookId(workbook.getWorkbookId())
                        .workbookName(workbook.getWorkbookName())
                        .workbookCreateBy(workbook.getWorkbookCreatedBy())
                        .build())
                .collect(Collectors.toList());

        // 3. BadgeName을 가져오기 위해 DB를 찔러준다.
        var badge = readBadge(account.getUsingBadgeId());

        // 4. 맞은 문제 리스트, 틀린 문제 리스트를 가져온다.
        SolvedQuestion lists = solvedRepository.findById(getAccountName())
                .orElseGet(() -> new SolvedQuestion(getAccountName()));
        lists.nullCheck();

        // 5. 그 후, 필요로 하는 정보들을 Response에 담아 전송한다
        return AccountDetailsRes.builder()
                .accountSuccessCount(account.getSuccessCount())
                .badgeName(badge.getBadgeName())
                .workbooks(workbookRes)
                .correct(lists.getCorrectQuestion())
                .wrong(lists.getWrongQuestion())
                .build();
    }


    @Transactional(readOnly = true)
    public List<BadgeRes> getMyBadge() {
        String accountName = getAccountName();

        var account = hasAccountWithAccountName(accountName);

        List<AccountBadge> accountBadges = accountBadgeRepository.findAccountBadgeByAccount(account);

        return accountBadges.stream()
                .map(AccountBadge::getBadgeId)
                .map(this::readBadge)
                .map(badge -> BadgeRes.builder()
                        .badgeId(badge.getBadgeId())
                        .badgeName(badge.getBadgeName())
                        .badgeExp(badge.getBadgeExp()).build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Account getAccountEntity() {
        return accountRepository.findAccountByAccountName(getAccountName()).orElseThrow(() -> {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        });
    }

    @Transactional(readOnly = true)
    public AccountTypeRes getAccountInfo() {
        Account account = hasAccountWithAccountName(getAccountName());
        return AccountTypeRes.builder()
                .accountRole(account.getAccountRole())
                .accountName(account.getAccountName())
                .build();
    }

    private Account hasAccountWithAccountName(String accountName) {
        return accountRepository.findAccountByAccountName(accountName)
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                });
    }

    private Badge readBadge(Long badgeId) {
        return badgeRepository.findById(badgeId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.BADGE_NOT_FOUND);
        });
    }
}
