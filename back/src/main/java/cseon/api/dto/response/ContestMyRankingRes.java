package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ContestMyRankingRes {

    private final String myRank;

    private final Integer myScore;

    private final Boolean IsExistMeInLeaderboard;

    @Builder
    public ContestMyRankingRes(String myRank, Integer myScore, Boolean isExistMeInLeaderboard){
        this.myRank = myRank;
        this.myScore = myScore;
        this.IsExistMeInLeaderboard = isExistMeInLeaderboard;
    }
}
