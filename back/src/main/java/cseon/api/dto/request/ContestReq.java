package cseon.api.dto.request;

import cseon.domain.Workbook;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ContestReq {

    private Workbook workbook;
    private String contestName;
    private String contestStart;
    private String contestEnd;

    @Builder
    ContestReq(Workbook workbook, String contestName, String contestStart, String contestEnd){
        this.workbook = workbook;
        this.contestName = contestName;
        this.contestStart = contestStart;
        this.contestEnd = contestEnd;
    }

}
