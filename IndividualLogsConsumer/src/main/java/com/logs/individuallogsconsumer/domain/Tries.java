package com.logs.individuallogsconsumer.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "tries")
public class Tries {
    @Id
    private String id;
    private String accountName;
    private String timestamp;
    private Long questionId;
    private Integer checkNumber;
    private Boolean isAnswer;

    @Builder
    public Tries(String accountName, String timestamp, Long questionId, Integer checkNumber, Boolean isAnswer){
        this.accountName = accountName;
        this.timestamp = timestamp;
        this.questionId = questionId;
        this.checkNumber = checkNumber;
        this.isAnswer = isAnswer;
    }
}