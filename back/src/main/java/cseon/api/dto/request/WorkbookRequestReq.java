package cseon.api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(description = "WorkbookRequest")
public class WorkbookRequestReq {

    private List<Long> questionId;

    private String workbookName;

    private String workbookCreatedBy;
}
