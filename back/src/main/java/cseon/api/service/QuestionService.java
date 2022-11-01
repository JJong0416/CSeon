package cseon.api.service;

import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.dto.response.AnswerDto;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.api.repository.AnswerRepository;
import cseon.api.repository.QuestionRepository;
import cseon.domain.AccountRequestQuestion;
import cseon.domain.Answer;
import cseon.domain.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final AccountRequestQuestionRepository accountRequestQuestionRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @Transactional
    public void requestQuestionAddBoard(QuestionRequestDto questionRequestDto) {
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder()
                .requestQuestionTitle(questionRequestDto.getQuestionTitle())
                .requestQuestionExp(questionRequestDto.getQuestionTitle())
                .build();

        accountRequestQuestionRepository.save(requestQuestion);
    }

    public QuestionDto getQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> {
            throw new NullPointerException("해당 문제가 존재하지 않습니다.");
        });

        Answer answer = answerRepository.findByQuestionIdAndRequest(questionId, true)
                .orElseThrow(() -> new NullPointerException("보기가 없습니다."));

        // answer : to Dto
        AnswerDto answerDto = AnswerDto.builder()
                .answers(answer.getAnswers())
                .rightAnswer(answer.getRightAnswer())
                .build();

        return new QuestionDto(question.getQuestionId(), question.getQuestionTitle(), question.getQuestionExp(), answerDto);
    }
}
