package cseon.domain.composite;

import cseon.domain.Workbook;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ContestWorkbookId implements Serializable {
    private Long contestId;
    private Workbook workbookId;
}
