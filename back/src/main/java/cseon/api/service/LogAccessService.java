package cseon.api.service;

import cseon.api.dto.response.SolvedInfoRes;
import cseon.api.dto.response.SolvedLogRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class LogAccessService {

    public List<SolvedLogRes> takeAllLogsWithQuestionIdAndNickname(Long questionId){
        return null;
    }

    public List<SolvedInfoRes> takeAccountSolvedQuestionWithQuestionId(Long questionId){
        return null;
    }
}
