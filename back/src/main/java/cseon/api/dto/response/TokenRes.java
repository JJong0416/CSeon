package cseon.api.dto.response;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class TokenRes {

    @NotNull
    private final String token;

    public TokenRes(String token) {
        this.token = token;
    }
}