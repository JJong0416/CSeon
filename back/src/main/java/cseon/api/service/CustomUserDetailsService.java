package cseon.api.service;

import cseon.api.repository.AccountRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Account;
import cseon.domain.type.AccountRole;
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
@Component
@RequiredArgsConstructor
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

    private User createUser(Account account) {
        final String ROLE = (account.getAccountRole().equals(AccountRole.USER))
                ? "ROLE_USER"
                : "ROLE_ADMIN";

        return new User(account.getAccountName(),
                passwordEncoder.encode(account.getAccountName()),
                List.of(new SimpleGrantedAuthority(ROLE)));
    }
}