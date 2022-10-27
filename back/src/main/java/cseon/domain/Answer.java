package cseon.domain;

import cseon.domain.composite.AnswerQuestionId;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "answer")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(AnswerQuestionId.class)
public class Answer {

    @Id
    @Column(name = "answer_id")
    private Long answerId;

    @Id
    @Column(name = "question_id")
    private Long questionId;

    @Column(name = "answer_content", nullable = false)
    private String answerContent;

    @Column(name = "answer_right", nullable = false)
    private Boolean answerRight;
}
