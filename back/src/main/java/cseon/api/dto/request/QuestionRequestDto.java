package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class QuestionRequestDto {

    @NotNull
    private final String questionTitle;

    @NotNull
    private final String questionExample;

    @Size(min = 1, max = 4)
    private final Integer questionAnswer;

    @Builder
    public QuestionRequestDto(String questionTitle, String questionExample, Integer questionAnswer) {
        this.questionTitle = questionTitle;
        this.questionExample = questionExample;
        this.questionAnswer = questionAnswer;
    }
}
