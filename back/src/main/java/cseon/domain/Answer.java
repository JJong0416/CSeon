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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question questionId;

    @Column(name = "answer_content", nullable = false)
    private String answerContent;

    @Column(name = "answer_right", nullable = false)
    private Boolean answerRight;
}
