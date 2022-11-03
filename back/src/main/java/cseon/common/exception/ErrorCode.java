package cseon.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    //400 BAD_REQUEST: 잘못된 요청
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    //401 UNAUTHORIZED : 권한 없음
    ACCESS_NOT_ALLOWED(HttpStatus.UNAUTHORIZED, "권한이 없습니다."),

    PASSWORD_NOT_VALID(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),

    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인이 필요한 서비스입니다."),

    //404 : NOT_FOUND_EXCEPTION : 리소스를 찾을 수 없음
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."),

    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "키워드를 찾을 수 없습니다."),

    WORKBOOK_NOT_FOUND(HttpStatus.NOT_FOUND, "문제집을 찾을 수 없습니다."),

    NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "해당 내용을 찾을 수 없습니다."),

    PICTURE_NOT_FOUND(HttpStatus.NOT_FOUND, "사진을 찾을 수 없습니다."),

    //405 METHOD_NOT_ALLOWED: 허용되지 않은 Request Method 호출
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 메서드입니다."),

    //409 CONFLICT : 이미 존재하는 정보
    ID_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 아이디입니다."),

    LIST_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 추가되어있습니다."),

    WORKBOOK_NAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "중복되는 문제집 이름입니다."),

    NICKNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 닉네임입니다."),

    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),

    //500 INTERNAL_SERVER_ERROR: 내부 서버 오류
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류입니다.");

    private final HttpStatus status;

    private final String message;
}
