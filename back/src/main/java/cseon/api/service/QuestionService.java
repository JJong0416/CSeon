package cseon.api.service;

import cseon.api.dto.request.AnswerRequestReq;
import cseon.api.dto.request.QuestionRequestReq;

import cseon.api.dto.response.AnswerRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.api.repository.AnswerRepository;
import cseon.api.repository.QuestionRepository;
import cseon.domain.AccountRequestQuestion;
import cseon.domain.Answer;
import cseon.api.dto.response.QuestionRes;
import cseon.api.repository.LabelRepository;
import cseon.domain.Label;
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
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final LabelRepository labelRepository;

    @Transactional
    public void requestQuestionAddBoard(QuestionRequestReq questionRequestReq) {

        // 1. 가져온 값을 바탕으로 질문지를 생성해서,
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder()
                .account(null) // TODO: 2022-10-30 로그인 기능 완성 시, 추가해서 넣기
                .requestQuestionTitle(questionRequestReq.getQuestionTitle())
                .requestQuestionExp(questionRequestReq.getQuestionExp())
                .build();

        // 2. MongoDB에 문제에 대한 설명을 넣어준다


        // 2. RDB에 저장한다.
        accountRequestQuestionRepository.save(requestQuestion);
    }

    @Transactional
    public void selectAnswer(AnswerRequestReq answerRequestReq) {

    }

    public QuestionDto getQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> {
            throw new NullPointerException("해당 문제가 존재하지 않습니다.");
        });

        Answer answer = answerRepository.findByQuestionIdAndRequest(questionId, true)
                .orElseThrow(() -> new NullPointerException("보기가 없습니다."));

        // answer : to Dto
        AnswerRes answerRes = AnswerRes.builder()
                .answers(answer.getAnswers())
                .rightAnswer(answer.getRightAnswer())
                .build();

        return new QuestionDto(question.getQuestionId(), question.getQuestionTitle(), question.getQuestionExp(), answerRes);
    }

    // TODO: 2022-10-30 ElasticSearch를 통한 검색 성능 향상 필수
    @Transactional(readOnly = true)
    public List<QuestionRes> takeQuestionsWithKeywordAndLabel(String keyword, String label) {

        // 1. 먼저 해당 label Keyword를 통해 label을 가지고 온다.
        Label findLabel = labelRepository.findByLabelName(label)
                .orElseThrow(IllegalArgumentException::new);

        // 2. 그 후, Question과 Question_Label 을 Fetch Join을 한다.
        List<Question> questions = questionRepository.findQuestionsByLabelAndKeyword(keyword);

        // 3. questions를 Stream()을 통해 루프를 돌리면서 question의 Label에 요청된 label이 있다면
        List<QuestionRes> questionRes = questions.stream()
                .filter(question -> question.getLabels()
                        .stream()
                        .anyMatch(questionLabel -> questionLabel.getLabelId().equals(findLabel)))
                .map(question -> QuestionRes.builder() // 새 객체를 만든다.
                        .questionId(question.getQuestionId())
                        .questionExp(question.getQuestionExp())
                        .questionTitle(question.getQuestionTitle())
                        .build())
                .collect(Collectors.toList());

        return questionRes;
    }
}
