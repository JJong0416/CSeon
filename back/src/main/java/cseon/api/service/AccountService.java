package cseon.api.service;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.dto.response.BadgeResponseRes;
import cseon.api.dto.response.WorkbookRes;
import cseon.api.repository.AccountBadgeRepository;
import cseon.api.repository.AccountRepository;
import cseon.api.repository.BadgeRepository;
import cseon.api.repository.WorkbookRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Account;
import cseon.domain.AccountBadge;
import cseon.domain.Badge;
import cseon.domain.Workbook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static cseon.common.utils.SecurityUtils.getAccountName;
import static cseon.common.utils.SecurityUtils.getCurrentUsername;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final WorkbookRepository workbookRepository;
    private final AccountBadgeRepository accountBadgeRepository;
    private final BadgeRepository badgeRepository;


    @Transactional(readOnly = true)
    public AccountDetailsRes takeMyPage() {

        Account account = accountRepository.findAccountByAccountName(getAccountName())
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                });

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
        Badge badge = readBadge(account.getUsingBadgeId());

        // 3. 그 후, 필요로 하는 정보들을 Response에 담아 전송한다
        return AccountDetailsRes.builder()
                .accountRole(account.getAccountRole())
                .accountSuccessCount(account.getSuccessCount())
                .badgeName(badge.getBadgeName())
                .workbooks(workbookRes)
                .build();
    }


    public List<BadgeResponseRes> getMyBadge() {
        String accountName = getCurrentUsername().get();
        Account account = accountRepository.findAccountByAccountName(accountName)
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                });
        List<AccountBadge> accountBadges = accountBadgeRepository.findByAccount(account);

        List<BadgeResponseRes> badges = accountBadges.stream()
                .map(AccountBadge::getBadgeId)
                .map(this::readBadge)
                .map(badge -> BadgeResponseRes.builder()
                        .badgeId(badge.getBadgeId())
                        .badgeName(badge.getBadgeName())
                        .badgeExp(badge.getBadgeExp()).build())
                .collect(Collectors.toList());

        return badges;
    }

    private Badge readBadge(Long badgeId) {
        return badgeRepository.findById(badgeId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.BADGE_NOT_FOUND);
        });
    }
}
