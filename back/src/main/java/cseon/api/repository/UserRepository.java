package cseon.api.repository;


import cseon.api.dto.layer.UserListDto;
import cseon.domain.PlatformType;
import cseon.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends CrudRepository<User, Long> {

    Boolean existsUserByUserId(String userId);

    Boolean existsUserByUserNickname(String userNickname);

    Optional<User> findUserByUserIdAndPlatformType(String userId, PlatformType platformType);

    Optional<User> findUserByUserEmail(String userEmail);

    Optional<User> findByUserId(String userId);

    Optional<User> findByUserNickname(String userNickname);

    List<UserListDto> findUserByUserIdOrUserEmailOrUserNickname(String userId, String userEmail, String userNickname);

    Boolean existsByUserEmailAndPlatformType(String email, PlatformType platformType);
}