package cseon.common.provider;

import cseon.config.KafkaProducerConfig;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Getter
@Component
@RequiredArgsConstructor
public class KafkaProducerProvider {
    private final KafkaProducerConfig kafkaProducerConfig;
    private KafkaProducer<String, String> kafkaProducer;

    @PostConstruct
    protected void init() {
        this.kafkaProducer = new KafkaProducer<String, String>(kafkaProducerConfig.kafkaProducerConfigs());
    }
}
