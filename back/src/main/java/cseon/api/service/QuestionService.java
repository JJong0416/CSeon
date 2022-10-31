package cseon.api.service;

import cseon.api.dto.request.QuestionRequestDto;
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
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder().requestQuestionTitle(questionRequestDto.getQuestionTitle()).requestQuestionExp(questionRequestDto.getQuestionTitle()).requestQuestionAns(questionRequestDto.getQuestionAnswer()).build();

        accountRequestQuestionRepository.save(requestQuestion);
    }

    public QuestionDto getQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> {
            throw new NullPointerException("해당 문제가 존재하지 않습니다.");
        });
//        List<AnswerDto> answers = answerRepository.findAllByQuestionId(question)
//                .stream().map(answer -> AnswerDto.builder()
//                        .answerId(answer.getAnswerId())
//                        .answerContent(answer.getAnswerContent())
//                        .answerRight(answer.getAnswerRight())
//                        .build()).collect(Collectors.toList());
//        List<String> answerlist = new LinkedList<>();
//        answerlist.add("1번보기");
//        answerlist.add("2번보기");
//        answerlist.add("3번보기");
//        answerlist.add("4번보기");
//        answerRepository.insert(Answer.builder()
//                        .questionId(1L)
//                        .request(true)
//                        .answers(answerlist)
//                        .rightAnswer(2)
//                        .build());
        Answer answer = answerRepository.findByQuestionIdAndRequest(questionId, true);
        return QuestionDto.builder().questionId(question.getQuestionId())
                .questionTitle(question.getQuestionTitle()).questionExp(question.getQuestionExp())
                .answers(answer).build();
    }
}
