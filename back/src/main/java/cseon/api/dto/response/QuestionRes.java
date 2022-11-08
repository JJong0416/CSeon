package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QuestionRes {

    private final Long questionId;

    private final String questionTitle;

    private final String questionExp;

    @Builder
    public QuestionRes(Long questionId, String questionTitle, String questionExp) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
    }
}

