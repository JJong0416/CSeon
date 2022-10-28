package cseon.domain;

import cseon.domain.composite.ContestWorkbookId;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Getter
@Table(name = "contest")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(ContestWorkbookId.class)
public class Contest {

    @Id
    @Column(name = "contest_id")
    private Long contestId;

    @Id
    @OneToOne
    @JoinColumn(name = "workbook_id")
    private Workbook workbookId;

    @Column(name = "contest_name", length = 50, nullable = false)
    private String contestName;

    @Column(name = "contest_start", nullable = false)
    private ZonedDateTime contestStart;

    @Column(name = "contest_end", nullable = false)
    private ZonedDateTime contestEnd;
}
