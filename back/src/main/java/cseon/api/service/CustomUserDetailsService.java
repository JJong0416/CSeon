package cseon.api.service;

import cseon.api.repository.AccountRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * UserDetailsService를 구현한 CustomUserDetailsService
 */
@RequiredArgsConstructor
@Component
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String accountName) {
        return accountRepository.findAccountByAccountName(accountName)
                .map(this::createUser)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    // TODO: 2022-11-06 ENUM 타입으로
    private User createUser(Account account) {
        final String ROLE = (account.getAccountRole().equals(false)) ? "ROLE_USER"
                : "ROLE_ADMIN";

        return new User(account.getAccountName(),
                passwordEncoder.encode(account.getAccountName()),
                List.of(new SimpleGrantedAuthority(ROLE)));
    }
}