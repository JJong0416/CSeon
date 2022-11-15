package cseon.api.dto.request;

import cseon.domain.Workbook;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class ContestReq {

    @NotNull
    private final Long workbookId;
    @NotBlank
    private final String contestName;
    @NotBlank
    private final String contestStart;
    @NotBlank
    private final String contestEnd;

    @Builder
    ContestReq(Long workbookId, String contestName, String contestStart, String contestEnd){
        this.workbookId = workbookId;
        this.contestName = contestName;
        this.contestStart = contestStart;
        this.contestEnd = contestEnd;
    }

}
