package com.logs.individuallogsconsumer.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AnswerRequest {
    private String timestamp;
    private Long questionId;
    private Integer checkNumber;
    private Boolean isAnswer;

    @Builder
    public AnswerRequest(String timestamp, Long questionId, Integer checkNumber, Boolean isAnswer){
        this.timestamp = timestamp;
        this.questionId = questionId;
        this.checkNumber = checkNumber;
        this.isAnswer = isAnswer;
    }
}
