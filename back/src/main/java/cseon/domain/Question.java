package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name="question")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_id", unique = true)
    private Long questionId;

    @Column(name="question_title", length = 200, nullable = false)
    private String questionTitle;

    @Column(name="question_exp", length = 200, nullable = false)
    private String questionExp;

    @Builder
    public Question(String questionTitle, String questionExp){
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
    }

    public Question(Long questionId, String questionTitle, String questionExp){
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
    }
}
