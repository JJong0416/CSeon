package com.cseon.worker;

import com.cseon.properties.ConsumerProperties;
import com.cseon.service.TryService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.errors.WakeupException;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

@Component
@RequiredArgsConstructor
public class TryWorker implements Runnable {
    private final ConsumerProperties consumerProperties;
    private final TryService tryService;
    private final String topic = "cseon.logs.try";
    private final Properties props = getProps();

    private Properties getProps() {
        Properties props = consumerProperties.properties();
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "tries");
        return props;
    }

    private KafkaConsumer<String, String> tryConsumer;

    @Override
    public void run() {
        tryConsumer = new KafkaConsumer<String, String>(props);
        tryConsumer.subscribe(Arrays.asList(topic));
        try{
            while(true){
                ConsumerRecords<String, String> records = tryConsumer.poll(Duration.ofSeconds(1));
                tryService.saveLogs(records);
                tryConsumer.commitSync();
            }
        } catch(WakeupException e){
            System.out.println("Error : WakeupException");
        } finally {
            tryConsumer.commitSync();
            tryConsumer.close();
        }
    }

    public void shutdown(){
        tryConsumer.wakeup();
    }
}
