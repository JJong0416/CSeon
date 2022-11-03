package cseon.api.repository;

import cseon.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT DISTINCT q FROM Question q LEFT JOIN FETCH q.labels where q.questionTitle like concat('%',:keyword,'%')")
    List<Question> findQuestionsByLabelAndKeyword(@Param("keyword") String keyword);

}
