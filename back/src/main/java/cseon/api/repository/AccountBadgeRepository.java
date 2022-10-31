package cseon.api.repository;

import cseon.domain.Account;
import cseon.domain.AccountBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountBadgeRepository  extends JpaRepository<AccountBadge, Long> {
    List<AccountBadge> findByAccount(Account account);
}
