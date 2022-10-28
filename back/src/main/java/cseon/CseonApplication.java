package cseon;

import cseon.config.AppProperties;
import cseon.config.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
@SpringBootApplication
@EnableJpaAuditing
public class CseonApplication {

    public static void main(String[] args) {
        SpringApplication.run(CseonApplication.class, args);
    }

}
