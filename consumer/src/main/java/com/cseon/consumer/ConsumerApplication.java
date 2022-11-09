package com.cseon.consumer;

import com.cseon.worker.TryWorker;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@SpringBootApplication

public class ConsumerApplication {

    public static void main(String[] args) {
        // TryWorker를 불러오자?

        SpringApplication.run(ConsumerApplication.class, args);

        ExecutorService executorService = Executors.newCachedThreadPool();
        for(int i=0; i<3; ++i){
            TryWorker worker = new TryWorker();
            executorService.execute(worker);
        }
    }
}
