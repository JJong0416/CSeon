package com.cseon.service;

import com.cseon.domain.Tries;
import com.cseon.repository.LogsRepository;
import com.cseon.vo.AnswerRequest;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ConsumerService {
    private final LogsRepository logsRepository;

    @KafkaListener(topics = "cseon.logs.try", groupId = "tries", concurrency = "3")
    public void saveIndiviualLogs(ConsumerRecords<String, String> records){
        for(ConsumerRecord<String, String> record : records){
            // 0:accountName 1:timestamp 2:questionId, 3:checkNumber 4:isAnswer
            String[] log = record.value().split(" ");

            // Tries 찾기. null인 경우와 null이 아닌 경우

            AnswerRequest answerRequest = AnswerRequest.builder()
                    .timestamp(log[1])
                    .questionId(Long.parseLong(log[2]))
                    .checkNumber(Integer.parseInt(log[3]))
                    .isAnswer(Boolean.parseBoolean(log[4]))
                    .build();

            logsRepository.save(tries);
        }
    }

    @KafkaListener(topics = "cseon.contest", groupId = "contest", concurrency = "3")
    public void saveContestLogs(ConsumerRecords<String, String> records){

    }
}
