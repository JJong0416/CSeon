package cseon.api.service;

import cseon.api.dto.response.AnswerRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.dto.response.QuestionRes;
import cseon.api.repository.AnswerRepository;
import cseon.api.repository.QuestionLabelRepository;
import cseon.api.repository.QuestionRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Answer;
import cseon.domain.Label;
import cseon.domain.Question;
import cseon.domain.QuestionLabel;
import cseon.domain.type.RequestQuestionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionSearchService {

    private final QuestionLabelRepository questionLabelRepository;
    private final QuestionRepository questionRepository;
    private final LabelService labelService;
    private final AnswerRepository answerRepository;

    public List<QuestionRes> takeAllQuestion() {
        return makeQuestionToQuestionRes(
                questionRepository.findAll());
    }

    public List<QuestionRes> takeQuestionWithKeyword(String keyword) {
        return makeQuestionToQuestionRes(
                questionRepository.findQuestionsByQuestionTitleContaining(keyword));
    }

    public List<QuestionRes> takeQuestionWithLabel(String label) {

        Label findLabel = labelService.getLabelIdByName(label);

        return questionRepository.findQuestionsByLabels().stream()
                .filter(getQuestionPredicateLabel(findLabel))
                .map(QuestionSearchService::makeQuestionRes)
                .collect(Collectors.toList());
    }

    // TODO: 2022-10-30 ElasticSearch를 통한 검색 성능 향상 필수
    public List<QuestionRes> takeQuestionsWithKeywordAndLabel(String keyword, String label) {

        Label findLabel = labelService.getLabelIdByName(label);

        return questionRepository.findQuestionsByLabelAndKeyword(keyword).stream()
                .filter(getQuestionPredicateLabel(findLabel))
                .map(QuestionSearchService::makeQuestionRes)
                .collect(Collectors.toList());
    }

    public QuestionDto takeDetailsQuestion(Long questionId) {

        Question question = questionRepository.findById(questionId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.QUESTION_NOT_FOUND);
        });

        Answer answer =
                answerRepository.findByQuestionIdAndRequest(questionId, RequestQuestionType.FORMAL)
                        .orElseThrow(() -> new CustomException(ErrorCode.ANSWER_NOT_FOUND));

        AnswerRes answerRes = AnswerRes.builder()
                .answers(answer.getAnswers())
                .rightAnswer(answer.getRightAnswer())
                .build();

        // label의 이름들을 찾아서 담기
        List<QuestionLabel> questionLabelList = questionLabelRepository.findAllByQuestionId(question);
        List<String> labels = null;
        if (!questionLabelList.isEmpty()) {
            labels = questionLabelList.stream()
                    .map(questionLabel -> labelService.getLabelNameById(questionLabel.getLabelId()))
                    .map(Label::getLabelName)
                    .collect(Collectors.toList());
        }

        return QuestionDto.builder()
                .questionId(question.getQuestionId())
                .questionTitle(question.getQuestionTitle())
                .questionExp(question.getQuestionExp())
                .answerRes(answerRes)
                .contestTitle(question.getQuestionTitle())
                .labels(labels)
                .build();
    }

    // TODO: 2022-11-09 ModelMapper는 성능적 이슈가 있기 때문에, MapStruct 도입 필수
    private List<QuestionRes> makeQuestionToQuestionRes(List<Question> questions) {
        return questions.stream()
                .map(QuestionSearchService::makeQuestionRes)
                .collect(Collectors.toList());
    }

    private Predicate<Question> getQuestionPredicateLabel(Label findLabel) {
        return question -> question.getLabels().stream()
                .anyMatch(questionLabel -> questionLabel.getLabelId().equals(findLabel));
    }

    private static QuestionRes makeQuestionRes(Question question) {
        return QuestionRes.builder() // 새 객체를 만든다.
                .questionId(question.getQuestionId())
                .questionExp(question.getQuestionExp())
                .questionTitle(question.getQuestionTitle())
                .build();
    }
}
