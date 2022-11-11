package cseon.api.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public class SolvedInfoRes {

    private List<Integer> correctList;

    private List<Integer> incorrectList;

    @Builder
    public SolvedInfoRes(List<Integer> correctList, List<Integer> incorrectList){
        this.correctList = correctList;
        this.incorrectList = incorrectList;
    }
}
