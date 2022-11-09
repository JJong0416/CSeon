package com.cseon.service;

import com.cseon.domain.Tries;
import com.cseon.repository.LogsRepository;
import com.cseon.vo.AnswerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerService {
    private final LogsRepository logsRepository;

    @KafkaListener(topics = "cseon.logs.try", groupId = "tries", containerFactory = "tryLogsKafkaListenerContainerFactory")
    public void saveIndividualListener(String record){
            // 0:accountName 1:timestamp 2:questionId, 3:checkNumber 4:isAnswer
            String[] log = record.split(" ");

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
