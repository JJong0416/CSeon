package cseon.api.service;

import cseon.api.dto.layer.RequestQuestionDto;
import cseon.api.dto.request.QuestionRequestDto;

import java.util.List;

public interface AdminService {
    List<RequestQuestionDto> getRequestQuestionList();
    RequestQuestionDto getRequestQuestion(Long requestQuestionId);
    boolean allowQuestion(Long requestQuestionId, QuestionRequestDto questionRequestDto);
    boolean modifyQuestion(QuestionRequestDto questionRequestDto);
}
