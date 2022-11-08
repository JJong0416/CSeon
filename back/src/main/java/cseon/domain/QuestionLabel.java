package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "question_label")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionLabel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_label_id")
    private Long questionLabelId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", referencedColumnName = "question_id")
    private Question questionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "label_id", referencedColumnName = "label_id")
    private Label labelId;

    @Builder
    public QuestionLabel(Question question, Label label){
        this.questionId = question;
        this.labelId = label;
    }
}
