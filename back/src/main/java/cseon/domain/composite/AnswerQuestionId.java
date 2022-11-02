package cseon.domain.composite;

import cseon.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerQuestionId implements Serializable {

    private Long answerId;

    private Question questionId;
}
