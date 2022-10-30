package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
@Getter
public class AnswerDto {
    @NotNull
    private final Long answerId;

    @NotNull
    private final String answerContent;

    @NotNull
    private final boolean answerRight;

    @Builder
    public AnswerDto(Long answerId, String answerContent, boolean answerRight) {
        this.answerId = answerId;
        this.answerContent = answerContent;
        this.answerRight = answerRight;
    }
}
