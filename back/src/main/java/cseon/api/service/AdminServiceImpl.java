package cseon.api.service;

import cseon.api.dto.layer.RequestQuestionDto;
import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.domain.RequestQuestion;
import cseon.exception.RequestQuestionApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final AccountRequestQuestionRepository accountRequestQuestionRepository;

    @Override
    public List<RequestQuestionDto> getRequestQuestionList() {
        List<RequestQuestion> list = accountRequestQuestionRepository.findAll();

        // MongoDB에서 보기 가져와야함

        // Entity to Dto.
        List<RequestQuestionDto> res = new ArrayList<>();

        return res;
    }

    @Override
    public RequestQuestionDto getRequestQuestion(Long requestQuestionId) {
        RequestQuestion requestQuestion = accountRequestQuestionRepository.findById(requestQuestionId).orElseThrow(
                () -> new RequestQuestionApiException("REQUEST_QUESTION_NOT_FOUND")
        );

        // Entity to Dto
        RequestQuestionDto res;

        return res;
    }

    @Override
    public boolean allowQuestion(Long requestQuestionId, QuestionRequestDto questionRequestDto) {

        // requestQuestion db에서 삭제
        accountRequestQuestionRepository.deleteById(requestQuestionId);

        // requestQuestionDto를 question에 추가

        return true;
    }

    @Override
    public boolean modifyQuestion(QuestionRequestDto questionRequestDto) {

        // questionRequestDto로 덮어쓰기
        
        return true;
    }
}
