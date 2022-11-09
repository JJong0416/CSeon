package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "workbook")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Workbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workbook_id")
    private Long workbookId;

    @Column(name = "workbook_name", length = 50, nullable = false)
    private String workbookName;

    @Column(name = "workbook_createdBy", nullable = false)
    private String workbookCreatedBy;

//    @Column(name = "question_list")
//    private String questionList;

    @Builder
    public Workbook(String workbookName, String workbookCreatedBy) {
//        this.questionList = questionList;
        this.workbookName = workbookName;
        this.workbookCreatedBy = workbookCreatedBy;
    }

    public void changeWorkbook(String workbookName) {
        this.workbookName = workbookName;
    }
}
