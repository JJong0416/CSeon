package cseon.api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@Schema(description = "WorkbookRequest")
public class WorkbookRequestDto {

    @Schema(description = "문제 목록", example = "[5, 60, 61, 80, 78, 54, 55, 80, 61, 60, 78]")
    private List<Long> questionId;

    @Schema(description = "사용자 좋아요 목록 소설 식별자", example = "2")
    private String workbookName;
}
