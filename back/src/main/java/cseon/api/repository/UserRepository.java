package cseon.api.repository;

import cseon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);

    @Query(value = "select count(*) from user",nativeQuery = true)
    int countUser();
    
    // userSeq로 User 반환
    User findByUserSeq(Long userSeq);
}
