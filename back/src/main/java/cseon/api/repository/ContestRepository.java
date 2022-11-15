package cseon.api.repository;

import cseon.domain.Contest;
import cseon.domain.Workbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {

    @Query(value = "select w from Contest w")
    Optional<List<Contest>> findAllContests();

    Optional<Contest> findContestByContestId(Long contestId);

    @Query(value = "SELECT contest_id FROM Contest", nativeQuery = true)
    Optional<Integer> findMaxCount();

    @Modifying
    @Query(value = "INSERT INTO contest VALUES(contest_id = :contestId, workbook_id = :workbook, contest_name = :contestName, contest_start = :startTime, contest_end = :endTime)", nativeQuery=true)
    @Transactional
    void insertCompositeContest(Long contestId, Workbook workbook, String contestName, ZonedDateTime startTime, ZonedDateTime endTime);
}

//    @Query(value = "select wq.question_id from workbook_question wq where workbook_id = :workbookId", nativeQuery = true)
//    Optional<List<Long>> findQuestionsByWorkbookId(Workbook workbookId);