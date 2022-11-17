package cseon.api.service;

import cseon.api.dto.request.WorkbookReq;
import cseon.api.dto.response.WorkbookDetailRes;
import cseon.api.dto.response.WorkbookRes;
import cseon.api.repository.QuestionRepository;
import cseon.api.repository.WorkbookQuestionRepository;
import cseon.api.repository.WorkbookRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Question;
import cseon.domain.Workbook;
import cseon.domain.WorkbookQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkbookService {

    private final WorkbookRepository workbookRepository;
    private final WorkbookQuestionRepository workbookQuestionRepository;
    private final QuestionRepository questionRepository;

    //모든 workbook 조회
    @Transactional(readOnly = true)
    public List<Workbook> takeAllQuestion() {
        return workbookRepository.findAllWorkbooks().orElseThrow(() -> {
            throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
        });
    }

    @Transactional(readOnly = true)
    public List<WorkbookRes> takeWorkbookWithKeyword(String keyword) {
        return workbookRepository.findWorkbooksByWorkbookNameContaining(keyword).stream()
                .map(makeWorkbookToWorkbookRes())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkbookDetailRes getWorkbook(Long workbookId) {
        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
                });

        List<Long> questions = workbookQuestionRepository.findQuestionsByWorkbookId(workbook)
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.QUESTION_NOT_FOUND);
                });

        return WorkbookDetailRes.builder()
                .workbookId(workbook.getWorkbookId())
                .workbookName(workbook.getWorkbookName())
                .questionIdList(questions)
                .build();
    }

    public void createWorkbook(WorkbookReq workbookReq) {

        List<Long> questionIds = workbookReq.getQuestionId();

        checkWorkbookWithCreatedByAndName(workbookReq);

        Workbook wb = Workbook.builder()
                .workbookCreatedBy(workbookReq.getWorkbookCreatedBy())
                .workbookName(workbookReq.getWorkbookName())
                .build();

        workbookRepository.save(wb);

        Long[] longs = workbookReq.getQuestionId().toArray(new Long[0]);
        for (long l : longs) {
            Question q = questionRepository.findQuestionByQuestionId(l).orElseThrow(() -> {
                throw new CustomException(ErrorCode.QUESTION_NOT_FOUND);
            });
            workbookQuestionRepository.save(WorkbookQuestion.builder().workbook(wb).question(q).build());
        }
    }

    public void modifyWorkbook(WorkbookReq workbookReq, Long workbookId) {

        Workbook workbook = getWorkbookWithWorkbookId(workbookId);

        List<Long> questionIds = workbookReq.getQuestionId();

        checkWorkbookWithCreatedByAndName(workbookReq);

        workbook.changeWorkbook(workbookReq.getWorkbookName());
    }

    private Workbook getWorkbookWithWorkbookId(Long workbookId) {
        return workbookRepository.findWorkbookByWorkbookId(workbookId)
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
                });
    }

    private void checkWorkbookWithCreatedByAndName(WorkbookReq workbookReq) {
        if (workbookRepository.findWorkbooksByWorkbookCreatedByAndWorkbookName(
                workbookReq.getWorkbookCreatedBy(), workbookReq.getWorkbookName()).isPresent()) {
            throw new CustomException(ErrorCode.WORKBOOK_NAME_ALREADY_EXISTS);
        }
    }

    private Function<Workbook, WorkbookRes> makeWorkbookToWorkbookRes() {
        return workbook -> WorkbookRes.builder()
                .workbookId(workbook.getWorkbookId())
                .workbookName(workbook.getWorkbookName())
                .workbookCreateBy(workbook.getWorkbookCreatedBy())
                .build();

    }
}
