package cseon.api.dto.response;

import cseon.domain.Question;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class WorkbookDetailRes {
    private final Long workbookId;

    private final String workbookName;

    private List<Long> questionIdList;

    @Builder
    public WorkbookDetailRes(Long workbookId, String workbookName, List<Long> questionIdList) {
        this.workbookId = workbookId;
        this.workbookName = workbookName;
        this.questionIdList = questionIdList;
    }
}