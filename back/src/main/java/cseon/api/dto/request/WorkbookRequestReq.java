package cseon.api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(description = "WorkbookRequest")
public class WorkbookRequestReq {

    @Schema(description = "문제 목록", example = "[5, 60, 61, 80, 78, 54, 55, 80, 61, 60, 78]")
    private List<Long> questionId;

    @Schema(description = "workbook 이름", example = "2")
    private String workbookName;

    @Schema(description = "유저 식별자", example = "1")
    private String workbookCreatedBy;
}
