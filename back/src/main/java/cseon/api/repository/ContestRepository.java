package cseon.api.repository;

import cseon.domain.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {

    @Query(value = "select w from Contest w")
    Optional<List<Contest>> findAllContests();

    Optional<Contest> findContestByContestId(Long contestId);
}
