package cseon.api.service;

import cseon.api.dto.request.AccountSignUpReq;
import cseon.api.repository.AccountRepository;
import cseon.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountDetailsService {

    private final AccountRepository accountRepository;

    @Transactional
    public void signup(AccountSignUpReq accountSignUpReq) {
        Account account = Account.builder()
                .accountName(accountSignUpReq.getAccountName())
                .accountRole(accountSignUpReq.getAccountRole())
                .successCount(accountSignUpReq.getAccountSuccessCount())
                .usingBadgeId(accountSignUpReq.getUsingBadgeId())
                .build();

        accountRepository.save(account);
    }
}
