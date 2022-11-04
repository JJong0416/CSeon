package cseon.api.dto.layer;

import cseon.api.dto.request.AnswerRequestReq;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
public class TryLogs implements Serializable {

    private static final long serialVersionUID = 1234L;

    @NotNull
    private final String accountName;

    @NotNull
    AnswerRequestReq answerRequestReq;

    @Builder
    public TryLogs(String accountName, AnswerRequestReq answerRequestReq){
        this.accountName = accountName;
        this.answerRequestReq = answerRequestReq;
    }

    @Override
    public String toString(){
        return accountName + " " + answerRequestReq.toString();
    }
}
