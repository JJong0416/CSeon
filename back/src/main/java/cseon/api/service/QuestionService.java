package cseon.api.service;

import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.api.repository.LabelRepository;
import cseon.domain.AccountRequestQuestion;
import cseon.domain.Label;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final AccountRequestQuestionRepository accountRequestQuestionRepository;
    private final LabelRepository labelRepository;

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
    public List<QuestionDto> takeQuestionsWithKeywordAndLabel(String keyword, String label){

        // 1. 먼저 해당 label Keyword를 통해 label을 가지고 온다.
        Label findLabel = labelRepository.findByLabelName(label)
                .orElseThrow(IllegalArgumentException::new);

        // 2. 그 후, Fetch Join을 진행하고, labelId와 Keyword를 포함하고 있는 List<QuestionDto>를 출력
        // 빡센데..?

        return null;
    }


}
