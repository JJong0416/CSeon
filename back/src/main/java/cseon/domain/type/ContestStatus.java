package cseon.domain.type;

import lombok.Getter;

@Getter
public enum ContestStatus {
    BEFORE_CONTEST("대회 준비", 0),
    IN_PROGRESS("대회 진행", 1),
    AFTER_CONTEST("대회 종료", 2);

    private final String desc;
    private final Integer stateCode;

    ContestStatus(String desc, Integer stateCode) {
        this.desc = desc;
        this.stateCode = stateCode;
    }
}
