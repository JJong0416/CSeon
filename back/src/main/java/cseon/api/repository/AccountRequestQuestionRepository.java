package cseon.api.repository;


import cseon.domain.AccountRequestQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRequestQuestionRepository extends JpaRepository<AccountRequestQuestion, Long> {
}
