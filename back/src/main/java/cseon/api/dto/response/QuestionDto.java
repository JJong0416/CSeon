package cseon.api.dto.response;

import cseon.domain.Answer;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class QuestionDto {

    @NotNull
    private final Long questionId;

    @NotNull
    private final String questionTitle;

    @NotNull
    private final String questionExp;

    @NotNull
    private final Answer answers;

    @Builder
    public QuestionDto(Long questionId, String questionTitle, String questionExp, Answer answers) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.answers = answers;
    }
}

