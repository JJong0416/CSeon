package cseon.api.dto.layer;

import lombok.Getter;

@Getter
public class UserListDto {

    private final String userId;

    private final String UserNickname;

    private final String UserEmail;

    public UserListDto(String userId, String userNickname, String userEmail) {
        this.userId = userId;
        UserNickname = userNickname;
        UserEmail = userEmail;
    }


}
