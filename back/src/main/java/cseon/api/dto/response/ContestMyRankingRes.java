package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ContestMyRankingRes {

    private final Long myRank;

    private final Double myScore;

    private final Boolean IsExistMeInLeaderboard;

    @Builder
    public ContestMyRankingRes(Long myRank, Double myScore, Boolean isExistMeInLeaderboard){
        this.myRank = myRank;
        this.myScore = myScore;
        this.IsExistMeInLeaderboard = isExistMeInLeaderboard;
    }
}
