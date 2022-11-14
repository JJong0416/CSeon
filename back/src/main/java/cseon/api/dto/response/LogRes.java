package cseon.api.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

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
