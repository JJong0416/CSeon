package com.contestlogs.contestlogsconsumer.service;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContestLogsService {

    private final RedisService redisService;

    @KafkaListener(topics = "cseon.logs.contest", groupId = "scorer", concurrency = "5")
    public void onMessage(ConsumerRecords<String, String> records){
        for(ConsumerRecord<String, String> record : records){

            // 0:contestId 1:accountName 2:score
            String[] info = record.value().split(" ");

            // redis에서 현재 스코어 찾기
            redisService.searchRankingInfo(Long.parseLong(info[0]));


        }
    }
}
