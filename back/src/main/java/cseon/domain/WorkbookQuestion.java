package cseon.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "workbook_question")
@NoArgsConstructor
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
}
