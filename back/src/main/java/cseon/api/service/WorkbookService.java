package cseon.api.service;

import cseon.api.dto.request.WorkbookRequestReq;
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
    public Workbook getWorkbook(Long workbookId) {
        return getWorkbookWithWorkbookId(workbookId);
    }

    public void createWorkbook(WorkbookRequestReq workbookRequestReq) {

        List<Long> questionIds = workbookRequestReq.getQuestionId();

        checkWorkbookWithCreatedByAndName(workbookRequestReq);

        Workbook wb = Workbook.builder()
                .workbookCreatedBy(workbookRequestReq.getWorkbookCreatedBy())
                .workbookName(workbookRequestReq.getWorkbookName())
                .build();

        workbookRepository.save(wb);

        Long[] longs = workbookRequestReq.getQuestionId().toArray(new Long[0]);
        for (long l : longs) {
            Question q = questionRepository.findQuestionByQuestionId(l).orElseThrow(() -> {
                throw new CustomException(ErrorCode.QUESTION_NOT_FOUND);
            });
            workbookQuestionRepository.save(WorkbookQuestion.builder().workbook(wb).question(q).build());
        }
    }

    public void modifyWorkbook(WorkbookRequestReq workbookRequestReq, Long workbookId) {

        Workbook workbook = getWorkbookWithWorkbookId(workbookId);

        List<Long> questionIds = workbookRequestReq.getQuestionId();

        checkWorkbookWithCreatedByAndName(workbookRequestReq);

        workbook.changeWorkbook(workbookRequestReq.getWorkbookName());
    }

    private Workbook getWorkbookWithWorkbookId(Long workbookId) {
        return workbookRepository.findWorkbookByWorkbookId(workbookId)
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
                });
    }

    private void checkWorkbookWithCreatedByAndName(WorkbookRequestReq workbookRequestReq) {
        if (workbookRepository.findWorkbooksByWorkbookCreatedByAndWorkbookName(
                workbookRequestReq.getWorkbookCreatedBy(), workbookRequestReq.getWorkbookName()).isPresent()) {
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
