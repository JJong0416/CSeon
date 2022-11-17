package cseon.api.repository;

import cseon.domain.Workbook;
import cseon.domain.WorkbookQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkbookQuestionRepository extends JpaRepository<WorkbookQuestion, Long> {

    //    @Query(value = "select wq from WorkbookQuestion wq join fetch wq.questionId")
    Optional<List<WorkbookQuestion>> findWorkbookQuestionsByWorkbookId(Workbook workbookId);


    @Query(value = "select wq.question_id from workbook_question wq where workbook_id = :workbookId", nativeQuery = true)
    Optional<List<Long>> findQuestionsByWorkbookId(Workbook workbookId);
}
