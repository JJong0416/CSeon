package cseon.domain;

import lombok.AccessLevel;
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

}
