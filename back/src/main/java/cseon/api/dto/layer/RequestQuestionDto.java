package cseon.api.dto.layer;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class RequestQuestionDto {

    @NotNull
    private final Long accountId;

    @NotNull
    private final String requestQuestionTitle;

    @NotNull
    private final String requestQuestionExp;

    @Size(min = 1,max = 4)
    private final Integer questionAnswer;

    @NotNull
    private final String[] answerList;

    @Builder
    public RequestQuestionDto(Long accountId, String requestQuestionTitle, String requestQuestionExp, Integer questionAnswer, String[] answerList){
        this.accountId = accountId;
        this.requestQuestionTitle = requestQuestionTitle;
        this.requestQuestionExp = requestQuestionExp;
        this.questionAnswer = questionAnswer;
        this.answerList = answerList;
    }
}
