package cseon.api.service;

import cseon.api.dto.layer.TryLog;
import cseon.api.dto.request.AnswerRequestReq;
import cseon.api.dto.request.QuestionRequestReq;
import cseon.api.dto.response.AnswerRes;
import cseon.api.dto.response.QuestionDto;
import cseon.api.dto.response.QuestionRes;
import cseon.api.repository.*;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.common.provider.KafkaProducerProvider;
import cseon.domain.*;
import cseon.domain.type.RequestQuestionType;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static cseon.common.utils.SecurityUtils.getAccountName;

@Service
@RequiredArgsConstructor
public class QuestionOperationService {

    private final AccountRequestQuestionRepository accountRequestQuestionRepository;
    private final AnswerRepository answerRepository;
    private final AccountService accountService;
    private final KafkaProducerProvider kafkaProducerProvider;


    @Transactional
    public void requestQuestionAddBoard(QuestionRequestReq questionRequestReq) {

        Account account = accountService.getAccountEntity();

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
        TryLog tryLog = TryLog.builder()
                .accountName(getAccountName())
                .answerRequestReq(answerRequestReq)
                .build();

        kafkaProducerProvider.getKafkaProducer().send(
                new ProducerRecord<>("cseon.logs.try", tryLog.toString()));
    }
}
