package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "workbook_question")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WorkbookQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workbook_question_id")
    private Long workbookQuestionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workbook_id", referencedColumnName = "workbook_id")
    private Workbook workbookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", referencedColumnName = "question_id")
    private Question questionId;

    @Builder
    public WorkbookQuestion(Workbook workbook, Question question){
        this.workbookId = workbook;
        this.questionId = question;
    }

}
