package cseon.api.repository;

import cseon.domain.SolvedQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolvedRepository extends MongoRepository<SolvedQuestion, String> {
}
