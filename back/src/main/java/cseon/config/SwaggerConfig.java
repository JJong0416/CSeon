package cseon.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "CS 선생님 CSeon",
                description = "CS 프로젝트",
                version = "v1"))
@RequiredArgsConstructor
@Configuration(proxyBeanMethods = false)
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi chatOpenApi() {
        String[] paths = {"/v1/**"};

        return GroupedOpenApi.builder()
                .group("CSeon API v1")
                .pathsToMatch(paths)
                .build();
    }
}