package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class QuestionDto {

    @NotNull
    private final Long questionId;

    @NotNull
    private final String questionTitle;

    @NotNull
    private final String questionExp;

    @NotNull
    private final List<AnswerDto> answers;

    @Builder
    public QuestionDto(Long questionId, String questionTitle, String questionExp, List<AnswerDto> answers) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.answers = answers;
    }
}

