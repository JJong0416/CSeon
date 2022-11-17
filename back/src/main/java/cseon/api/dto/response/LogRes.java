package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LogRes {
    private final LocalDateTime timestamp;
    private final Integer checkNumber;
    private final Boolean isAnswer;

    @Builder
    public LogRes(LocalDateTime timestamp, Integer checkNumber, Boolean isAnswer){
        this.timestamp = timestamp;
        this.checkNumber = checkNumber;
        this.isAnswer = isAnswer;
    }
}
