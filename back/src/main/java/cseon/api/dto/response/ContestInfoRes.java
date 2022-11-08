package cseon.api.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.util.Map;
import java.util.SortedMap;

@Getter
public class ContestInfoRes {

    private final SortedMap<String, Double> highRanking;

    private final ContestMyRankingRes contestMyRankingRes;

    @Builder
    public ContestInfoRes(SortedMap<String, Double> highRanking, ContestMyRankingRes contestMyRankingRes){
        this.highRanking = highRanking;
        this.contestMyRankingRes = contestMyRankingRes;
    }
}
