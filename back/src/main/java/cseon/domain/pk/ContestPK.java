package cseon.domain.pk;

import cseon.domain.Workbook;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ContestPK implements Serializable {
    private Long contestId;
    private Workbook workbookId;
}
