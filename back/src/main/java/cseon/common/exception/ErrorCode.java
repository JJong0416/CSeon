package cseon.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    POINT_LACK_ERROR(HttpStatus.BAD_REQUEST, "사용자의 포인트가 부족합니다."),

    //400 BAD_REQUEST: 잘못된 요청
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    LIMIT_CANT_BE_LESS_THAN_BEFORE(HttpStatus.BAD_REQUEST, "기존 설정 인원보다 적게 수정할 수 없습니다."),

    MISSION_NOT_OPENED(HttpStatus.BAD_REQUEST, "가입이 불가능한 미션입니다."),

    PASSWORD_NOT_VALID(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),

    MISSION_FULL(HttpStatus.BAD_REQUEST, "가입 가능 인원을 초과하여 가입이 불가능합니다"),

    //401 UNAUTHORIZED : 권한 없음
    ACCESS_NOT_ALLOWED(HttpStatus.UNAUTHORIZED, "권한이 없습니다."),

    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인이 필요한 서비스입니다."),

    //404 : NOT_FOUND_EXCEPTION : 리소스를 찾을 수 없음
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."),

    PICTURE_NOT_FOUND(HttpStatus.NOT_FOUND, "사진을 찾을 수 없습니다."),

    OCTOPUS_NOT_FOUND(HttpStatus.NOT_FOUND, "OCTOPUS를 찾을 수 없습니다."),
    MISSION_NOT_FOUND(HttpStatus.NOT_FOUND, "미션을 찾을 수 없습니다."),

    //405 METHOD_NOT_ALLOWED: 허용되지 않은 Request Method 호출
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 메서드입니다."),

    //409 CONFLICT : 이미 존재하는 정보
    ID_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 아이디입니다."),
    NICKNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 닉네임입니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),

    //500 INTERNAL_SERVER_ERROR: 내부 서버 오류
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류입니다.");



    private final HttpStatus status;
    private final String message;


}
