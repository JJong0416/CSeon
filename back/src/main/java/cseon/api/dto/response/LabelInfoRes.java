package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LabelInfoRes {

    private final String labelName;

    @Builder
    public LabelInfoRes(String labelName){
        this.labelName = labelName;
    }
}
