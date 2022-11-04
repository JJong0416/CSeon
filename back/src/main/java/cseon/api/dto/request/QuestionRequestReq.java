package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter @NoArgsConstructor
public class QuestionRequestReq {

    private Long questionId;

    @NotNull
    private String questionTitle;

    @NotNull
    private String questionExp;

    @NotNull
    private List<String> answers;

    @Size(min = 1, max = 4)
    private Integer rightAnswer;

    private Long accountId;

    @Builder
    public QuestionRequestReq(String questionTitle, String questionExp, List<String> answers, Integer rightAnswer) {
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }

    public QuestionRequestReq(
            Long questionId, String questionTitle, String questionExp, List<String> answers, Integer rightAnswer, Long accountId) {
        this(questionTitle, questionExp, answers, rightAnswer, accountId);
        this.questionId = questionId;
    }


    public QuestionRequestReq(String questionTitle, String questionExp, List<String> answers, Integer rightAnswer, Long accountId) {
        this(questionTitle, questionExp, answers, rightAnswer);
        this.accountId = accountId;
    }
}
