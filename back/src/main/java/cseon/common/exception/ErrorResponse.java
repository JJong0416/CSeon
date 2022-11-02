package cseon.common.exception;

import lombok.Getter;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
@Getter
public class ErrorResponse {

    private final LocalDateTime timestamp = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();

    private final int status;
    private final String error;
    private final String code;
    private final String message;

    public ErrorResponse(ErrorCode errorCode) {
        this.status = errorCode.getStatus().value();
        this.error = errorCode.getStatus().name();
        this.code = errorCode.name();
        this.message = errorCode.getMessage();
    }
}
