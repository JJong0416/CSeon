package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class QuestionDto {

    @com.sun.istack.NotNull
    private final Long questionId;

    @NotNull
    private final String questionTitle;

    @NotNull
    private final String questionExp;

    @Builder
    public QuestionDto(Long questionId, String questionTitle, String questionExp) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
    }
}

