package com.cseon.service;

import com.cseon.domain.Tries;
import com.cseon.repository.LogsRepository;
import com.cseon.vo.AnswerRequest;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TryService {
    private final LogsRepository logsRepository;

    public void saveLogs(ConsumerRecords<String, String> records) {
        for(ConsumerRecord<String, String> record : records){
            // 0:accountName 1:timestamp 2:questionId, 3:checkNumber 4:isAnswer
            String[] log = record.value().split(" ");

            // Tries 찾기. null인 경우와 null이 아닌 경우
            Tries tries = logsRepository.findById(log[0])
                    .orElseGet(
                            () -> new Tries(log[0])
                    );

            AnswerRequest answerRequest = AnswerRequest.builder()
                    .timestamp(log[1])
                    .questionId(Long.parseLong(log[2]))
                    .checkNumber(Integer.parseInt(log[3]))
                    .isAnswer(Boolean.parseBoolean(log[4]))
                    .build();

            tries.addLogs(answerRequest);
            logsRepository.save(tries);
        }
    }
}
