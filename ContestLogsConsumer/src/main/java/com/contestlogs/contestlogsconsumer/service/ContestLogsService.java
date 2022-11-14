package com.contestlogs.contestlogsconsumer.service;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContestLogsService {
    private final RedisTemplate<String, String> redisTemplate;

    @KafkaListener(topics = "cseon.logs.contest", groupId = "scorer", concurrency = "5")
    public void onMessage(ConsumerRecords<String, String> records, Acknowledgment ack){
        for(ConsumerRecord<String, String> record : records){

            // 0:contestId 1:accountName 2:score
            String[] info = record.value().split(" ");

            // 현재 점수 + 추가 점수
            redisTemplate.opsForZSet().add(info[0], info[1], Double.parseDouble(info[2]));
        }

        // Kafka offset commit
        ack.acknowledge();
    }
}
