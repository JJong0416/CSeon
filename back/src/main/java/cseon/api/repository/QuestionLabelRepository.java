package cseon.api.repository;

import cseon.domain.QuestionLabel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionLabelRepository extends JpaRepository<QuestionLabel, Long> {

}
