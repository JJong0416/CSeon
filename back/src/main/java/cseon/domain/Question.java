package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Table(name = "question")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id", unique = true)
    private Long questionId;

    @Column(name = "question_title", length = 200, nullable = false)
    private String questionTitle;

    @Column(name = "question_exp", length = 200, nullable = false)
    private String questionExp;

    @OneToMany(mappedBy = "questionId", fetch = FetchType.LAZY)
    private List<QuestionLabel> labels;

    @Builder
    public Question(Long questionId, String questionTitle, String questionExp) {
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
        this.questionId = questionId;
    }

    public void accountChangeQuestion(String questionTitle, String questionExp) {
        this.questionTitle = questionTitle;
        this.questionExp = questionExp;
    }
}
