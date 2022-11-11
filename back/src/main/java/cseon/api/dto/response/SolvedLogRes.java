package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class SolvedLogRes {

    private final Integer selectedAnswer;

    private final Integer isRight;

    private final Timestamp timestamp;

    @Builder
    public SolvedLogRes(Integer selectedAnswer, Integer isRight, Timestamp timestamp){
        this.selectedAnswer = selectedAnswer;
        this.isRight = isRight;
        this.timestamp = timestamp;
    }
}
