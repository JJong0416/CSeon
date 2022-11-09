package com.cseon.domain;

import com.cseon.vo.AnswerRequest;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;
import java.util.stream.Collectors;

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
        checkSolved(answerRequest.getQuestionId(), answerRequest.getIsAnswer());
    }

    public void checkSolved(Long questionId, Boolean isAnswer){
        Set<Long> correct = new HashSet<>(correctQuestion);
        Set<Long> wrong = new HashSet<>(wrongQuestion);

        if(correct.contains(questionId))
            return;

        if(isAnswer){
            correct.add(questionId);
            if(wrong.contains(questionId))
                wrong.remove(questionId);
        } else
            wrong.add(questionId);

        this.correctQuestion = correct.stream()
                .sorted()
                .collect(Collectors.toList());

        this.wrongQuestion = wrong.stream()
                .sorted()
                .collect(Collectors.toList());
    }

    public Tries(String accountName){
        this.accountName = accountName;
    }
}
