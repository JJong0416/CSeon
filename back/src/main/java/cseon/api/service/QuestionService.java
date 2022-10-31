package cseon.api.service;

import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.dto.response.QuestionRes;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.api.repository.LabelRepository;
import cseon.api.repository.QuestionLabelRepository;
import cseon.api.repository.QuestionRepository;
import cseon.domain.AccountRequestQuestion;
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
    private final LabelRepository labelRepository;
    private final QuestionRepository questionRepository;
    private final QuestionLabelRepository questionLabelRepository;

    @Transactional
    public void requestQuestionAddBoard(QuestionRequestDto questionRequestDto) {

        // 1. 가져온 값을 바탕으로 질문지를 생성해서,
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder()
                .account(null) // TODO: 2022-10-30 로그인 기능 완성 시, 추가해서 넣기
                .requestQuestionTitle(questionRequestDto.getQuestionTitle())
                .requestQuestionExp(questionRequestDto.getQuestionTitle())
                .requestQuestionAns(questionRequestDto.getQuestionAnswer())
                .build();

        // 2. RDB에 저장한다.
        accountRequestQuestionRepository.save(requestQuestion);
    }

    // TODO: 2022-10-30 ElasticSearch를 통한 검색 성능 향상 필수
    @Transactional(readOnly = true)
    public List<QuestionRes> takeQuestionsWithKeywordAndLabel(String keyword, String label) {

        // 1. 먼저 해당 label Keyword를 통해 label을 가지고 온다.
        Label findLabel = labelRepository.findByLabelName(label)
                .orElseThrow(IllegalArgumentException::new);

        // 2. 그 후, Question과 Question_Label 을 Fetch Join을 한다.
        List<Question> questions = questionRepository.findQuestionsByLabelAndKeyword(keyword);

        // 3. Stream을 통해 question에 있는 List<Label>을 돌면서, LabelId가 있는지 조회한다.
        questions.stream()
                .map(question -> question.getLabels()
                        .stream()
                        .filter(questionLabel -> questionLabel.getQuestionLabelId()
                                .equals(findLabel.getLabelId())))
                .collect(Collectors.toList());
        return null;
    }
}
