package cseon.api.dto.layer;

import lombok.Getter;
import java.io.Serializable;

@Getter
public class AccountContestAnswerDto implements Serializable {
    private final Long contestId;
    private final String accountName;
    private final Long score;

    public AccountContestAnswerDto(Long contestId, Long score){
        this.contestId = contestId;
        this.accountName = getAccountName();
        this.score = score;
    }

    @Override
    public String toString(){
        return contestId + " " + accountName + " " + score;
    }
}
