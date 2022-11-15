package cseon.api.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ContestInfoRes {

    private final List<RankingRes> highRanking;

    private final ContestMyRankingRes contestMyRankingRes;

    @Builder
    public ContestInfoRes(List<RankingRes> highRanking, ContestMyRankingRes contestMyRankingRes) {
        this.highRanking = highRanking;
        this.contestMyRankingRes = contestMyRankingRes;
    }
}
