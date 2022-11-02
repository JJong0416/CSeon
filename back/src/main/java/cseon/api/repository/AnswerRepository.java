package cseon.api.repository;

import cseon.domain.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends MongoRepository<Answer, Long> {
    //List<Answer> findAllByQuestionId(Question questionId);
    Optional<Answer> findByQuestionIdAndRequest(Long questionId, Boolean request);
}
