package cseon.api.dto.layer;

import cseon.api.dto.request.AnswerReq;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Getter
public class TryLog implements Serializable {

    private static final long serialVersionUID = 1234L;

    @NotNull
    private final String accountName;

    @NotNull
    private final AnswerReq answerRequestReq;

    @NotNull
    private final LocalDateTime timestamp;

    @Builder
    public TryLog(String accountName, AnswerReq answerReq) {
        this.accountName = accountName;
        this.answerRequestReq = answerReq;
        this.timestamp = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
    }

    @Override
    public String toString() {
        return accountName + " " + timestamp + " " + answerRequestReq.toString();
    }
}
