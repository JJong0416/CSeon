package cseon.api.repository;

import cseon.domain.Answer;
import cseon.domain.type.RequestQuestionType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends MongoRepository<Answer, Long> {
    Optional<Answer> findByQuestionIdAndRequest(Long questionId, RequestQuestionType request);
}
