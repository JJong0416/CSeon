package cseon.api.repository;

import cseon.domain.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends MongoRepository<Answer, Long> {
    //List<Answer> findAllByQuestionId(Question questionId);
    Answer findByQuestionIdAndRequest(Long questionId, Boolean request);
}
