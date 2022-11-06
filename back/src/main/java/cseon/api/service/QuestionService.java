package cseon.api.service;

import cseon.api.dto.request.AnswerRequestReq;
import cseon.api.dto.request.QuestionRequestReq;

import cseon.api.dto.response.AnswerRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.*;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.*;
import cseon.api.dto.response.QuestionRes;
import cseon.domain.type.RequestQuestionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static cseon.common.utils.SecurityUtils.getAccountName;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final AccountRequestQuestionRepository accountRequestQuestionRepository;

    private final QuestionRepository questionRepository;

    private final AnswerRepository answerRepository;

    private final LabelRepository labelRepository;

    private final AccountRepository accountRepository;

    @Transactional
    public void requestQuestionAddBoard(QuestionRequestReq questionRequestReq) {

        Account account = accountRepository.findAccountByAccountName(getAccountName())
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                });

        // 1. 가져온 값을 바탕으로 질문지를 생성해서,
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder()
                .account(account)
                .requestQuestionTitle(questionRequestReq.getQuestionTitle())
                .requestQuestionExp(questionRequestReq.getQuestionExp())
                .build();

        // 2. RDB에 저장한 흐,
        Long rqId = accountRequestQuestionRepository.save(requestQuestion).getRequestQuestionId();

        // 3. MongoDB에 넣어줄 문제를 생성하고
        Answer answer = Answer.builder()
                .questionId(rqId)
                .request(RequestQuestionType.INFORMAL)
                .answers(questionRequestReq.getAnswers())
                .rightAnswer(questionRequestReq.getRightAnswer())
                .build();

        // 4. MongoDB에 넣어준다.
        answerRepository.save(answer);
    }

    @Transactional
    public void selectAnswer(AnswerRequestReq answerRequestReq) {

    }

    @Transactional(readOnly = true)
    public QuestionDto getQuestion(Long questionId) {

        Question question = questionRepository.findById(questionId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.QUESTION_NOT_FOUND);
        });

        Answer answer = answerRepository.findByQuestionIdAndRequest(questionId, RequestQuestionType.INFORMAL)
                .orElseThrow(() -> new CustomException(ErrorCode.ANSWER_NOT_FOUND));

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
