package cseon.api.service;

import cseon.api.dto.request.QuestionRequestReq;
import cseon.api.dto.response.AnswerRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.AccountRepository;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.api.repository.AnswerRepository;
import cseon.api.repository.QuestionRepository;
import cseon.domain.AccountRequestQuestion;
import cseon.domain.Answer;
import cseon.domain.Question;
import cseon.common.exception.RequestQuestionApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AccountRequestQuestionRepository accountRequestQuestionRepository;
    private final QuestionRepository questionRepository;
    private final AccountRepository accountRepository;
    private final AnswerRepository answerRepository;

    public List<QuestionDto> getRequestQuestionList() {
        List<AccountRequestQuestion> requestList = accountRequestQuestionRepository.findAll();
        List<QuestionDto> res = new ArrayList<>();

        // questionId, questionTitle, accountId -> Dto
        for(AccountRequestQuestion accountRequestQuestion : requestList){
            QuestionDto questionDto = new QuestionDto(accountRequestQuestion.getRequestQuestionId(),
                    accountRequestQuestion.getRequestQuestionTitle(),
                    accountRequestQuestion.getAccount().getAccountId());

            res.add(questionDto);
        }
        return res;
    }

    public QuestionDto getRequestQuestion(Long requestQuestionId) {
        AccountRequestQuestion accountRequestQuestion = accountRequestQuestionRepository.findById(requestQuestionId)
                .orElseThrow(() -> new RequestQuestionApiException("REQUEST_QUESTION_NOT_FOUND"));

        Answer answer = answerRepository.findByQuestionIdAndRequest(accountRequestQuestion.getRequestQuestionId(), true)
                .orElseThrow(() -> new NullPointerException("보기가 없습니다."));

        // answer : to Dto
        AnswerRes answerRes = AnswerRes.builder()
                .answers(answer.getAnswers())
                .rightAnswer(answer.getRightAnswer())
                .build();

        // question : to Dto
        QuestionDto res = QuestionDto.builder()
                .questionId(accountRequestQuestion.getRequestQuestionId())
                .questionTitle(accountRequestQuestion.getRequestQuestionTitle())
                .questionExp(accountRequestQuestion.getRequestQuestionExp())
                .answerRes(answerRes)
                .accountId(accountRequestQuestion.getAccount().getAccountId())
                .build();

        return res;
    }

    public boolean allowQuestion(QuestionRequestReq questionRequestReq) {

        // requestQuestionDto를 question에 추가
        Question question = Question.builder()
                .questionTitle(questionRequestReq.getQuestionTitle())
                .questionExp(questionRequestReq.getQuestionExp())
                .build();
        Long id = questionRepository.save(question).getQuestionId();

        // answer의 questionId, request 변경
        Answer original = answerRepository.findByQuestionIdAndRequest(questionRequestReq.getQuestionId(), true)
                .orElseThrow(() -> new NullPointerException("보기가 없습니다."));
        Answer answer = Answer.builder()
                .id(original.getId())
                .questionId(id)
                .request(false)
                .answers(questionRequestReq.getAnswers())
                .rightAnswer(questionRequestReq.getRightAnswer())
                .build();
        answerRepository.save(answer);

        // requestQuestion db에서 삭제
        accountRequestQuestionRepository.deleteById(questionRequestReq.getQuestionId());

        // 해당 account success 증가
        accountRepository.updateAccountSuccess(questionRequestReq.getAccountId());

        return true;
    }

    @Transactional
    public Boolean modifyQuestion(QuestionRequestReq questionRequestReq) {

        Question question = questionRepository.findById(questionRequestReq.getQuestionId())
                .orElseThrow(() -> new NullPointerException("해당 문제가 존재하지 않습니다."));

        Answer answer = answerRepository.findByQuestionIdAndRequest(questionRequestReq.getQuestionId(), false)
                .orElseThrow(() -> new NullPointerException("보기가 없습니다."));

        // question 덮어쓰기
        question.accountChangeQuestion(questionRequestReq.getQuestionTitle(), questionRequestReq.getQuestionExp());
        questionRepository.save(question);

        // answer 덮어쓰기
        Answer a = Answer.builder()
                .id(answer.getId())
                .questionId(questionRequestReq.getQuestionId())
                .request(false)
                .answers(questionRequestReq.getAnswers())
                .rightAnswer(questionRequestReq.getRightAnswer())
                .build();
        answerRepository.save(a);

        return true;
    }
}
