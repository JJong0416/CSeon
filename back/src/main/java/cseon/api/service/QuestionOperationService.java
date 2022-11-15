package cseon.api.service;

import cseon.api.dto.layer.TryLog;
import cseon.api.dto.request.AnswerReq;
import cseon.api.dto.request.QuestionReq;
import cseon.api.dto.response.LogRes;
import cseon.api.repository.AccountRequestQuestionRepository;
import cseon.api.repository.AnswerRepository;
import cseon.api.repository.LogRepository;
import cseon.common.provider.KafkaProducerProvider;
import cseon.domain.Account;
import cseon.domain.AccountRequestQuestion;
import cseon.domain.Answer;
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
    private final LogRepository logRepository;


    @Transactional
    public void requestQuestionAddBoard(QuestionReq questionReq) {

        Account account = accountService.getAccountEntity();

        // 1. 가져온 값을 바탕으로 질문지를 생성해서,
        AccountRequestQuestion requestQuestion = AccountRequestQuestion.builder()
                .account(account)
                .requestQuestionTitle(questionReq.getQuestionTitle())
                .requestQuestionExp(questionReq.getQuestionExp())
                .build();

        // 2. RDB에 저장한 흐,
        Long rqId = accountRequestQuestionRepository.save(requestQuestion).getRequestQuestionId();

        // 3. MongoDB에 넣어줄 문제를 생성하고
        Answer answer = Answer.builder()
                .questionId(rqId)
                .request(RequestQuestionType.INFORMAL)
                .answers(questionReq.getAnswers())
                .rightAnswer(questionReq.getRightAnswer())
                .build();

        // 4. MongoDB에 넣어준다.
        answerRepository.save(answer);
    }

    @Transactional
    public void selectAnswer(AnswerReq answerReq) {
        TryLog tryLog = TryLog.builder()
                .accountName(getAccountName())
                .answerReq(answerReq)
                .build();

        kafkaProducerProvider.getKafkaProducer().send(
                new ProducerRecord<>("cseon.logs.try", tryLog.toString()));
    }

    @Transactional
    public List<LogRes> takeAllLogs(Long questionId) {
        return logRepository.findAllByQuestionIdAndAccountName(questionId, getAccountName())
                .stream()
                .map(tries -> LogRes.builder()
                        .timestamp(tries.getTimestamp())
                        .checkNumber(tries.getCheckNumber())
                        .isAnswer(tries.getIsAnswer())
                        .build())
                .collect(Collectors.toList());
    }
}
