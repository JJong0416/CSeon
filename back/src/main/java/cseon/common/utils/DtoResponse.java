package cseon.common.utils;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class DtoResponse<T> extends MessageResponse {

    T responseDto;

    public DtoResponse(HttpStatus httpStatus, String message, T dto) {
        super(httpStatus, message);
        this.responseDto = dto;
    }

    public static <T> DtoResponse<T> of(HttpStatus httpStatus, String message, T dto){
        return new DtoResponse<>(httpStatus, message, dto);
    }
}
