package cseon.domain;

import cseon.domain.composite.ContestWorkbookId;
import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Getter @ToString
@Table(name = "contest")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contest_id")
    private Long contestId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workbook_id")
    private Workbook workbookId;

    @Column(name = "contest_name", length = 50, nullable = false)
    private String contestName;

    @Column(name = "contest_start", nullable = false)
    private ZonedDateTime contestStart;

    @Column(name = "contest_end", nullable = false)
    private ZonedDateTime contestEnd;

    @Builder
    public Contest(
            Workbook workbook, String contestName, ZonedDateTime contestStart, ZonedDateTime contestEnd){
        this.workbookId = workbook;
        this.contestName = contestName;
        this.contestStart = contestStart;
        this.contestEnd = contestEnd;
    }
}
