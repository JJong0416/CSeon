package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ContestResultRes {


    private final Long contestId;

    private final String contestName;

    public ContestInfoRes contestInfoRes;

    @Builder
    public ContestResultRes(Long contestId, String contestName, ContestInfoRes contestInfoRes){
        this.contestId = contestId;
        this.contestName = contestName;
        this.contestInfoRes = contestInfoRes;
    }
}
