package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Builder @ToString
public class QuestionDto {

    private Long questionId;

    private String questionTitle;

    private String questionExp;

    private AnswerRes answerRes;

    private Long accountId;

    private String accountName;

    private List<String> labels;
}

