package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class WorkbookRequestReq {

    private List<Long> questionId;

    private String workbookName;

    private String workbookCreatedBy;

    @Builder
    WorkbookRequestReq(List<Long> questionId, String workbookCreatedBy, String workbookName){
        this.questionId = questionId;
        this.workbookCreatedBy = workbookCreatedBy;
        this.workbookName = workbookName;
    }
}
