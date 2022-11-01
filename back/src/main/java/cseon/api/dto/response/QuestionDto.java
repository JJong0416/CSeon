package cseon.api.dto.response;

import cseon.domain.Answer;
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

    private AnswerDto answerDto;

    private Long accountId;

    public QuestionDto(Long questionId, String questionTitle, Long accountId){
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.accountId = accountId;
    }

    public QuestionDto(Long questionId, String questionTitle, String questionExp, AnswerDto answerDto) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.answerDto= answerDto;
    }

    @Builder
    public QuestionDto(Long questionId, String questionTitle, String questionExp, AnswerDto answerDto, Long accountId){
        this(questionId, questionTitle, questionExp, answerDto);
        this.accountId = accountId;
    }
}

