package cseon.api.repository;

import cseon.domain.WorkbookQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkbookQuestionRepository extends JpaRepository<WorkbookQuestion, Long> {

}
