package cseon.api.repository;

import cseon.domain.Tries;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LogRepository extends MongoRepository<Tries, String> {
    Optional<List<Tries>> findAllByQuestionIdAndAccountName(Long questionId, String accountName);
}
