package cseon.api.service;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.repository.AccountRepository;
import cseon.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional(readOnly = true)
    public AccountDetailsRes takeMyPage(){
        Account account = accountRepository.findById(1L).get(); // TODO: 2022-11-01 Account 계정 가져오기
        return null;
    }
}
