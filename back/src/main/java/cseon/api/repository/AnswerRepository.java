package cseon.api.repository;

import cseon.domain.Answer;
import cseon.domain.Question;
import cseon.domain.composite.AnswerQuestionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, AnswerQuestionId> {
    List<Answer> findAllByQuestionId(Question questionId);
}
