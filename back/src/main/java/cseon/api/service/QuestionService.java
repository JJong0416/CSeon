package cseon.api.service;

import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.dto.response.AnswerDto;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.api.repository.AnswerRepository;
import cseon.api.repository.QuestionRepository;
import cseon.domain.AccountRequestQuestion;
import cseon.domain.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final AccountRequestQuestionRepository accountRequestQuestionRepository;
    private final QuestionRepository  questionRepository;
    private final AnswerRepository answerRepository;

    @Transactional
    public void requestQuestionAddBoard(QuestionRequestDto questionRequestDto) {
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder()
                .requestQuestionTitle(questionRequestDto.getQuestionTitle())
                .requestQuestionExp(questionRequestDto.getQuestionTitle())
                .requestQuestionAns(questionRequestDto.getQuestionAnswer())
                .build();

        accountRequestQuestionRepository.save(requestQuestion);
    }

    public QuestionDto getQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(
                ()->{ throw new NullPointerException("해당 문제가 존재하지 않습니다.");}
        );
        List<AnswerDto> answers = answerRepository.findAllByQuestionId(question)
                .stream().map(answer -> AnswerDto.builder()
                        .answerId(answer.getAnswerId())
                        .answerContent(answer.getAnswerContent())
                        .answerRight(answer.getAnswerRight())
                        .build()).collect(Collectors.toList());

        return QuestionDto.builder()
                .questionId(question.getQuestionId())
                .questionTitle(question.getQuestionTitle())
                .questionExp(question.getQuestionExp())
                .answers(answers)
                .build();
    }
}
