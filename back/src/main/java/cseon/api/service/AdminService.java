package cseon.api.service;

import cseon.api.dto.request.QuestionRequestReq;
import cseon.api.dto.response.AnswerRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.repository.*;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.*;
import cseon.domain.type.RequestQuestionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AccountRequestQuestionRepository accountRequestQuestionRepository;
    private final QuestionRepository questionRepository;
    private final AccountRepository accountRepository;
    private final AnswerRepository answerRepository;
    private final QuestionLabelRepository questionLabelRepository;
    private final LabelService labelService;

    @Transactional(readOnly = true)
    public List<QuestionDto> getRequestQuestionList() {

        List<AccountRequestQuestion> requestList = accountRequestQuestionRepository.findAll();

        // requestList 안의 내용을 questionDto로 변경
        return requestList.stream()
                .map(accountRequestQuestion -> new QuestionDto(accountRequestQuestion.getRequestQuestionId(),
                        accountRequestQuestion.getRequestQuestionTitle(),
                        accountRequestQuestion.getAccount().getAccountId()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public QuestionDto getRequestQuestion(Long requestQuestionId) {
        var accountRequestQuestion =
                accountRequestQuestionRepository.findById(requestQuestionId)
                        .orElseThrow(() -> new CustomException(ErrorCode.QUESTION_NOT_FOUND));

        Answer answer =
                answerRepository.findByQuestionIdAndRequest(accountRequestQuestion.getRequestQuestionId(), RequestQuestionType.INFORMAL)
                        .orElseThrow(() -> new CustomException(ErrorCode.ANSWER_NOT_FOUND));

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

    @Transactional
    public boolean allowQuestion(QuestionRequestReq questionRequestReq) {

        // requestQuestionDto를 question에 추가
        Question question = Question.builder()
                .questionTitle(questionRequestReq.getQuestionTitle())
                .questionExp(questionRequestReq.getQuestionExp())
                .build();

        Long id = questionRepository.save(question).getQuestionId();

        // answer의 questionId, request 변경
        Answer answer =
                answerRepository.findByQuestionIdAndRequest(questionRequestReq.getQuestionId(), RequestQuestionType.INFORMAL)
                        .orElseThrow(() -> new CustomException(ErrorCode.ANSWER_NOT_FOUND));

        answer.allowAnswer(id, questionRequestReq.getAnswers(), questionRequestReq.getRightAnswer());

        answerRepository.save(answer);

        // QuestionLabel 추가
        for (String labelName : questionRequestReq.getLabels()) {
            questionLabelRepository.save(QuestionLabel.builder()
                    .question(question)
                    .label(labelService.getLabelIdByName(labelName))
                    .build());
        }

        // requestQuestion db에서 삭제
        accountRequestQuestionRepository.deleteById(questionRequestReq.getQuestionId());

        // 해당 account success 증가
        accountRepository.updateAccountSuccess(questionRequestReq.getAccountId());

        return true;
    }

    // TODO: 2022-11-06 Dirty Check 공부해보세요 :) .save() 를 해도 될 지 안해도 될지!?
    @Transactional
    public Boolean modifyQuestion(QuestionRequestReq questionRequestReq) {

        Question question =
                questionRepository.findById(questionRequestReq.getQuestionId())
                        .orElseThrow(() -> new CustomException(ErrorCode.QUESTION_NOT_FOUND));

        Answer answer =
                answerRepository.findByQuestionIdAndRequest(questionRequestReq.getQuestionId(), RequestQuestionType.FORMAL)
                        .orElseThrow(() -> new CustomException(ErrorCode.ANSWER_NOT_FOUND));

        // question 덮어쓰기
        question.accountChangeQuestion(questionRequestReq.getQuestionTitle(), questionRequestReq.getQuestionExp());
        questionRepository.save(question);

        // answer 덮어쓰기
        answer.modifyAnswer(questionRequestReq.getAnswers(), questionRequestReq.getRightAnswer());
        answerRepository.save(answer);

        // 라벨 다른 부분 수정
        List<String> after = questionRequestReq.getLabels();
        List<QuestionLabel> before = questionLabelRepository.findAllByQuestionId(question);

        if (after == null && before == null) {
            // 변경 x

        } else if (after == null) {
            // 들어온 값이 null -> before 전부 삭제
            for (QuestionLabel questionLabel : before)
                questionLabelRepository.delete(questionLabel);

        } else if (before == null) {
            // 원래 있던 값이 null -> after 전부 저장
            List<Label> labels = after.stream()
                    .map(labelService::getLabelIdByName)
                    .collect(Collectors.toList());

            for (Label label : labels) {
                questionLabelRepository.save(QuestionLabel.builder()
                        .question(question)
                        .label(label)
                        .build());
            }
        } else {
            // 원래 값과 들어온 값 비교
            List<Label> afterList = after.stream()
                    .map(labelService::getLabelIdByName)
                    .collect(Collectors.toList());

            HashMap<Long, Boolean> exist = new HashMap<>();
            for (QuestionLabel questionLabel : before)
                exist.put(questionLabel.getLabelId().getLabelId(), false);

            for (Label label : afterList) {
                Boolean flag = exist.get(label.getLabelId());
                if (!flag) {  // 존재 -> true로 마킹
                    exist.put(label.getLabelId(), true);
                } else if (flag == null) {    // 존재x -> 새로 추가
                    questionLabelRepository.save(QuestionLabel.builder()
                            .question(question)
                            .label(label)
                            .build());
                }
            }

            for (QuestionLabel questionLabel : before) {
                if (!exist.get(questionLabel.getLabelId().getLabelId()))
                    questionLabelRepository.delete(questionLabel);
            }
        }

        return true;
    }
}
