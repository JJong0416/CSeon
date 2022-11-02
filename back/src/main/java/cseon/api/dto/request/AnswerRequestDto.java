package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class AnswerRequestDto {
    @NotNull
    private final Long questionId;

    @Size(min = 1, max = 4)
    private final Integer checkNumber;
    @NotNull
    private final Boolean isAnswer;

    @Builder
    public AnswerRequestDto(Long questionId, Integer checkNumber, Boolean isAnswer) {
        this.questionId = questionId;
        this.checkNumber = checkNumber;
        this.isAnswer = isAnswer;
    }
}
