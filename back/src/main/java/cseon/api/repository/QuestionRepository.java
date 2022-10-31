package cseon.api.repository;

import cseon.api.dto.response.QuestionRes;
import cseon.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT DISTINCT q FROM Question q LEFT JOIN FETCH q.labels where q.questionTitle like concat('%',:keyword,'%')")
    List<Question> findQuestionsByLabelAndKeyword(@Param("keyword") String keyword);

}
