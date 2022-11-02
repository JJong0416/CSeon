package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
public class QuestionRequestDto {

    @NotNull
    private final Long questionId;

    @NotNull
    private final String questionTitle;

    @NotNull
    private final String questionExp;

    @NotNull
    private final List<String> answers;

    @Size(min = 1, max = 4)
    private final Integer rightAnswer;

    private Long accountId;

    @Builder
    public QuestionRequestDto(Long questionId, String questionTitle, String questionExp, List<String> answers, Integer rightAnswer, Long accountId) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
        this.accountId = accountId;
    }
}
