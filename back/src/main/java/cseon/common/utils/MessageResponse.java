package cseon.common.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public class MessageResponse {

    HttpStatus httpStatus;

    String message;

    public static MessageResponse of(HttpStatus httpStatus, String message){
        return new MessageResponse(httpStatus, message);
    }
}
