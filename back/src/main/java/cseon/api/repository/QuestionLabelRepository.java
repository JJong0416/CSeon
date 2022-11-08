package cseon.api.repository;

import cseon.domain.QuestionLabel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionLabelRepository extends JpaRepository<QuestionLabel, Long> {

    List<QuestionLabel> findAllByQuestionId(Long questionId);

}
