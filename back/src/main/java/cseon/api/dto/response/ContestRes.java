package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.ZonedDateTime;

@Getter
public class ContestRes {
    private final Long contestId;
    private final String contestTitle;

    private final ZonedDateTime startTime;

    private final ZonedDateTime endTime;

    private final String isExpired;

    @Builder
    public ContestRes(Long contestId, String contestTitle, ZonedDateTime startTime, ZonedDateTime endTime, String isExpired){
        this.contestId = contestId;
        this.contestTitle = contestTitle;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isExpired = isExpired;
    }

}
