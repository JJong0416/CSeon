package com.logs.individuallogsconsumer.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Getter
@Document(collection = "account_solved")
public class AccountSolved {
    @Id
    private String id;
    private Set<Long> correctQuestion;
    private Set<Long> wrongQuestion;

    public AccountSolved(String id){
        this.id = id;
        correctQuestion = new HashSet<>();
        wrongQuestion = new HashSet<>();
    }

    public void check(Long questionId, Boolean isAnswer){
        correctQuestion.forEach(id -> System.out.println(id));
        if(correctQuestion.contains(questionId))
            return;

        System.out.println("isAnswer check");
        if(isAnswer){
            correctQuestion.add(questionId);
            if(wrongQuestion.contains(questionId))
                wrongQuestion.remove(questionId);
        } else {
            wrongQuestion.add(questionId);
        }
    }
}
