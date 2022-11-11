package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class QuestionRequestReq {

    private Long questionId;

    @NotNull
    private String questionTitle;

    @NotNull
    private String questionExp;

    @NotNull
    private List<String> answers;

    @NotNull
    private Integer rightAnswer;

    private Long accountId;

    private List<String> labels;

    @Builder
    public QuestionRequestReq(String questionTitle, String questionExp, List<String> answers, Integer rightAnswer) {
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }

    public QuestionRequestReq(
            Long questionId, String questionTitle, String questionExp, List<String> answers, Integer rightAnswer) {
        this(questionTitle, questionExp, answers, rightAnswer);
        this.questionId = questionId;
    }


    public QuestionRequestReq(String questionTitle, String questionExp, List<String> answers, Integer rightAnswer, Long accountId) {
        this(questionTitle, questionExp, answers, rightAnswer);
        this.accountId = accountId;
    }

    public void updateQuestionInfo(Long accountId, Long questionId) {
        this.accountId = accountId;
        this.questionId = questionId;
    }
}
