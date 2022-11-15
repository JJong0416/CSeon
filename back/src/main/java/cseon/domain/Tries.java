package cseon.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "tries")
public class Tries {

    @Id
    private String id;

    @NotNull
    private String accountName;

    @NotNull
    private LocalDateTime timestamp;

    @NotNull
    private Long questionId;

    @NotNull
    private Integer checkNumber;

    @NotNull
    private Boolean isAnswer;
}
