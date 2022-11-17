package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ContestResultRes {


    private final Long contestId;

    private final Long workbookId;

    private final String contestName;

    public final ContestInfoRes contestInfoRes;

    @Builder
    public ContestResultRes(Long contestId, Long workbookId, String contestName, ContestInfoRes contestInfoRes) {
        this.contestId = contestId;
        this.workbookId = workbookId;
        this.contestName = contestName;
        this.contestInfoRes = contestInfoRes;
    }
}
