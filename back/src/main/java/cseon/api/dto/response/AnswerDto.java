package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class AnswerDto {

    @NotNull
    private final List<String> answers;

    @NotNull
    private final Integer rightAnswer;

    @Builder
    public AnswerDto(List<String> answers, Integer rightAnswer) {
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }
}
