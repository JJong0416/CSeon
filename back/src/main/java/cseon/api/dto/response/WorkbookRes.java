package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class WorkbookRes {

    private final Long workbookId;

    private final String workbookName;

    private final String workbookCreateBy;

    @Builder
    public WorkbookRes(Long workbookId, String workbookName, String workbookCreateBy) {
        this.workbookId = workbookId;
        this.workbookName = workbookName;
        this.workbookCreateBy = workbookCreateBy;
    }
}
