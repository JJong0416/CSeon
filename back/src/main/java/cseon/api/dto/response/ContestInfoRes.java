package cseon.api.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class ContestInfoRes {

    private final Map<String, Integer> highRanking;

    private final ContestMyRankingRes contestMyRankingRes;

    @Builder
    public ContestInfoRes(Map<String, Integer> highRanking, ContestMyRankingRes contestMyRankingRes){
        this.highRanking = highRanking;
        this.contestMyRankingRes = contestMyRankingRes;
    }
}
