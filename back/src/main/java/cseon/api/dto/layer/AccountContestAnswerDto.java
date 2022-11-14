package cseon.api.dto.layer;

import lombok.Getter;
import java.io.Serializable;

@Getter
public class AccountContestAnswerDto implements Serializable {

    private static final long serialVersionUID = 1232L;

    private final Long contestId;
    private final String accountName;
    private final Double score;

    public AccountContestAnswerDto(Long contestId, Double score){
        this.contestId = contestId;
        this.accountName = getAccountName();
        this.score = score;
    }

    @Override
    public String toString(){
        return contestId + " " + accountName + " " + score;
    }
}
