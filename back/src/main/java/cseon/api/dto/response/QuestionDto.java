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

    private String questionExp;

    private AnswerRes answerRes;

    private Long accountId;

    private List<String> labels;

    public QuestionDto(Long questionId, String questionTitle, Long accountId) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.accountId = accountId;
    }

    public QuestionDto(Long questionId, String questionTitle, String questionExp, AnswerRes answerRes) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.answerRes = answerRes;
    }

    public QuestionDto(Long questionId, String questionTitle, String questionExp, AnswerRes answerRes, List<String> labels) {
        this(questionId, questionTitle, questionExp, answerRes);
        this.labels = labels;
    }

    @Builder
    public QuestionDto(
            Long questionId, String questionTitle, String questionExp, AnswerRes answerRes, Long accountId, List<String> labels) {
        this(questionId, questionTitle, questionExp, answerRes);
        this.accountId = accountId;
        this.labels = labels;
    }
}

