package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
public class AnswerRequestReq implements Serializable {

    private static final long serialVersionUID = 1233L;

    @NotNull
    private final Long questionId;

    @NotNull
    private final Integer checkNumber;

    @NotNull
    private final Boolean isAnswer;

    @Builder
    public AnswerRequestReq(Long questionId, Integer checkNumber, Boolean isAnswer) {
        this.questionId = questionId;
        this.checkNumber = checkNumber;
        this.isAnswer = isAnswer;
    }

    @Override
    public String toString() {
        return questionId + " " + checkNumber + " " + isAnswer;
    }
}
