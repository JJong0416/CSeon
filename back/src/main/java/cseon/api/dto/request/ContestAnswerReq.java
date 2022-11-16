package cseon.api.dto.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

@Getter
public class ContestAnswerReq {

    @NotNull
    private final Long contestId;

    @NotNull
    private final Boolean isAnswer;

    @NotNull
    private final Integer problemIdx;

    @NotNull
    private final ZonedDateTime endTime;

    @Builder
    public ContestAnswerReq(Long contestId, Boolean isAnswer, Integer problemIdx, ZonedDateTime endTime) {
        this.contestId = contestId;
        this.isAnswer = isAnswer;
        this.problemIdx = problemIdx;
        this.endTime = endTime;
    }
}
