package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class WorkbookRes {

    private final Long workbookId;

    private final String workbookName;

    private final Long workbookCreateBy;

    @Builder
    public WorkbookRes(Long workbookId, String workbookName, Long workbookCreateBy) {
        this.workbookId = workbookId;
        this.workbookName = workbookName;
        this.workbookCreateBy = workbookCreateBy;
    }
}
