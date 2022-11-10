package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.ZonedDateTime;

@Getter
public class ContestRes {

    private final String contestTitle;

    private final ZonedDateTime startTime;

    private final ZonedDateTime endTime;

    private final boolean isExpired;

    @Builder
    public ContestRes(String contestTitle, ZonedDateTime startTime, ZonedDateTime endTime, boolean isExpired){
        this.contestTitle = contestTitle;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isExpired = isExpired;
    }

}
