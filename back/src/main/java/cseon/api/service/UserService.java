package cseon.api.service;

import cseon.api.dto.response.UserResponseDto;
import cseon.domain.User;

public interface UserService {

    UserResponseDto getUser();
    User getUserEntity();


}
