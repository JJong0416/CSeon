package cseon.api.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ContestInfoRes {

    private final List<RankingRes> highRanking;

    private final ContestMyRankingRes contestMyRankingRes;

    private final Integer contestProblemIdx;

    @Builder
    public ContestInfoRes(List<RankingRes> highRanking, ContestMyRankingRes contestMyRankingRes, Integer contestProblemIdx) {
        this.highRanking = highRanking;
        this.contestMyRankingRes = contestMyRankingRes;
        this.contestProblemIdx = contestProblemIdx;
    }
}
