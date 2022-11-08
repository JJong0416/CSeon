package cseon.domain.type;

import lombok.Getter;

@Getter
public enum AccountRole {
    USER("사용자", 0),
    ADMIN("관리자", 1);

    private final String desc;
    private final Integer stateCode;

    AccountRole(String desc, Integer stateCode){
        this.desc = desc;
        this.stateCode = stateCode;
    }
}
