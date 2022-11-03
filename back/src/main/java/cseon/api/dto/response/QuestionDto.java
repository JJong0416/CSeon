package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class QuestionDto {

    @NotNull
    private final Long questionId;

    @NotNull
    private final String questionTitle;

    private String questionExp;

    private AnswerRes answerRes;

    private Long accountId;

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

    @Builder
    public QuestionDto(Long questionId, String questionTitle, String questionExp, AnswerRes answerRes, Long accountId) {
        this(questionId, questionTitle, questionExp, answerRes);
        this.accountId = accountId;
    }
}

