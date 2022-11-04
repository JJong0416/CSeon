package cseon.api.repository;

import cseon.domain.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {
    @Transactional(readOnly = true)
    Optional<Badge> findBadgeByBadgeName(String badgeName);
}
