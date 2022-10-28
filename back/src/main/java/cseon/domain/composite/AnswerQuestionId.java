package cseon.domain.composite;

import cseon.domain.Question;
import lombok.Data;

import java.io.Serializable;

@Data
public class AnswerQuestionId implements Serializable {

    private Long answerId;

    private Question questionId;
}
