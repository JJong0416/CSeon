package cseon.domain.type;

import lombok.Getter;

@Getter
public enum RequestQuestionType {
    INFORMAL("비정식 문제", 0),
    FORMAL("정식 문제", 1);

    private final String desc;
    private final Integer stateCode;

    RequestQuestionType(String desc, Integer stateCode) {
        this.desc = desc;
        this.stateCode = stateCode;
    }
}
