package com.logs.individuallogsconsumer.service;

import com.logs.individuallogsconsumer.domain.AccountSolved;
import com.logs.individuallogsconsumer.domain.Tries;
import com.logs.individuallogsconsumer.repository.SolvedRepository;
import com.logs.individuallogsconsumer.repository.TryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class LogsService {
    private final TryRepository tryRepository;
    private final SolvedRepository solvedRepository;
    private final Logger logger = LoggerFactory.getLogger("LogsService.class");

    @KafkaListener(topics = "cseon.logs.try", groupId = "history", concurrency = "3")
    public void onMessage(ConsumerRecords<String, String> records, Acknowledgment ack) {
        for(ConsumerRecord<String, String> record : records){

            // 0:accountName 1:timestamp 2:questionId, 3:checkNumber 4:isAnswer
            String[] log = record.value().split(" ");

            logger.info("1");
            for(String s : log){
                System.out.println(s);
            }

            logger.info("2");
            // 계정 당 틀린 문제, 맞은 문제 검색
            AccountSolved accountSolved = solvedRepository.findById(log[0])
                    .orElseGet(
                            () -> new AccountSolved(log[0])
                    );

            logger.info("3");
            // 틀린 문제, 맞은 문제 체크
            accountSolved.check(Long.parseLong(log[2]), Boolean.parseBoolean(log[4]));

            logger.info("4");
            // log 저장
            tryRepository.save(Tries.builder()
                    .accountName(log[0])
                    .timestamp(log[1])
                    .questionId(Long.parseLong(log[2]))
                    .checkNumber(Integer.parseInt(log[3]))
                    .isAnswer(Boolean.parseBoolean(log[4]))
                    .build());

            logger.info("5");
            // 틀린 문제, 맞은 문제 저장
            solvedRepository.save(accountSolved);
        }

        // Kafka offset commit
        ack.acknowledge();
    }
}
