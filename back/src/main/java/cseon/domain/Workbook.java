package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.jdbc.Work;

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

    @Builder
    public Workbook(String workbookName){
        this.workbookName = workbookName;
    }
}
