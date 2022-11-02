package cseon.api.repository;

import cseon.domain.Answer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface AnswerRepository extends MongoRepository<Answer, Long> {
    //List<Answer> findAllByQuestionId(Question questionId);
    Optional<Answer> findByQuestionIdAndRequest(Long questionId, Boolean request);
}
