package com.cseon.domain;

import com.cseon.vo.AnswerRequest;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Document(collection = "tries")
public class Tries {
    @Id
    private String accountName;
    private List<Long> correctQuestion;
    private List<Long> wrongQuestion;
    private List<AnswerRequest> logs;

    public void addLogs(AnswerRequest answerRequest){
        this.logs.add(answerRequest);
    }

    public Tries(String accountName){
        this.accountName = accountName;
    }
}
