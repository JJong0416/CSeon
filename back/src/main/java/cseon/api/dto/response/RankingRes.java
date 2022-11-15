package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RankingRes {

    private final String accountNickname;

    private final Double accountScore;

    @Builder
    public RankingRes(String accountNickname, Double accountScore){
        this.accountNickname = accountNickname;
        this.accountScore = accountScore;
    }
}
