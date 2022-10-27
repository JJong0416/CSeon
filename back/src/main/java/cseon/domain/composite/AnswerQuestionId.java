package cseon.domain.composite;

import lombok.Data;

import java.io.Serializable;

@Data
public class AnswerQuestionId implements Serializable {

    private Long answerId;

    private Long questionId;
}
