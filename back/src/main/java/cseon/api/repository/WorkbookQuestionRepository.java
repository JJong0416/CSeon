package cseon.api.repository;

import cseon.domain.Question;
import cseon.domain.WorkbookQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkbookQuestionRepository extends JpaRepository<WorkbookQuestion, Long> {

    @Query(value = "select q from Question q join fetch WorkbookQuestion wq where wq.workbookId = :workbookId")
    Optional<List<Question>> findQuestionsByWorkbookId(Long workbookId);
}
