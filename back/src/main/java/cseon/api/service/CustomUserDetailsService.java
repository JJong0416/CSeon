package cseon.api.service;

import cseon.api.repository.AccountRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * UserDetailsService를 구현한 CustomUserDetailsService
 */
@RequiredArgsConstructor
@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String accountName) {
        return accountRepository.findAccountByAccountName(accountName)
                .map(this::createUser)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    private org.springframework.security.core.userdetails.User createUser(Account account) {
        return new org.springframework.security.core.userdetails.User(account.getAccountName(),
                account.getAccountName(),
                List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}