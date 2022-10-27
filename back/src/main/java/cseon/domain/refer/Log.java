package cseon.domain.refer;

import cseon.domain.Answer;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Log {

    private Long logId;

    private Answer answer;

    private ZonedDateTime logTime;

    private Long uuid;
}
