package cseon.api.repository;

import cseon.domain.Account;
import cseon.domain.AccountBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountBadgeRepository extends JpaRepository<AccountBadge, Long> {
    List<AccountBadge> findAccountBadgeByAccount(Account account);
}
