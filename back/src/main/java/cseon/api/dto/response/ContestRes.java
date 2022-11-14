package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.ZonedDateTime;

@Getter
public class ContestRes {
    private final Long contestId;
    private final String contestName;

    private final ZonedDateTime startTime;

    private final ZonedDateTime endTime;

    private final String isExpired;

    @Builder
    public ContestRes(Long contestId, String contestName, ZonedDateTime startTime, ZonedDateTime endTime, String isExpired){
        this.contestId = contestId;
        this.contestName = contestName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isExpired = isExpired;
    }

}
