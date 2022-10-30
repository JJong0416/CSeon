package cseon.api.repository;

import cseon.domain.RequestQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRequestQuestionRepository extends JpaRepository<RequestQuestion, Long> {

}
