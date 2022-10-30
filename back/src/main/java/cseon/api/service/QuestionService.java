package cseon.api.service;

import cseon.api.dto.request.QuestionRequestDto;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.domain.AccountRequestQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final AccountRequestQuestionRepository accountRequestQuestionRepository;

    @Transactional
    public void requestQuestionAddBoard(QuestionRequestDto questionRequestDto) {
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder()
                .requestQuestionTitle(questionRequestDto.getQuestionTitle())
                .requestQuestionExp(questionRequestDto.getQuestionTitle())
                .requestQuestionAns(questionRequestDto.getQuestionAnswer())
                .build();

        accountRequestQuestionRepository.save(requestQuestion);
    }
}
