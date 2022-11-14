package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ContestReq {

    private Long workbookId;
    private String contestName;
    private String contestStart;
    private String contestEnd;

    @Builder
    ContestReq(Long workbookId, String contestName, String contestStart, String contestEnd){
        this.workbookId = workbookId;
        this.contestName = contestName;
        this.contestStart = contestStart;
        this.contestEnd = contestEnd;
    }

}
