package cseon.api.service;

import cseon.api.dto.request.WorkbookRequestReq;
import cseon.api.repository.WorkbookRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Workbook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkbookService {

    private final WorkbookRepository workbookRepository;

    //모든 workbook 조회
    @Transactional(readOnly = true)
    public List<Workbook> getAllWorkbook() {
        return workbookRepository.findAllWorkbooks()
                .orElseThrow(() -> {
                    throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
                });
    }

    @Transactional(readOnly = true)
    public Workbook getWorkbook(Long workbookId) {
        return getWorkbookWithWorkbookId(workbookId);
    }

    public void createWorkbook(WorkbookRequestReq workbookRequestReq) {

        List<Long> questionIds = workbookRequestReq.getQuestionId();

        checkWorkbookWithCreatedByAndName(workbookRequestReq);

        Workbook wb = Workbook.builder()
                .workbookCreatedBy(workbookRequestReq.getWorkbookCreatedBy())
                .workbookName(workbookRequestReq.getWorkbookName())
                .questionList(changeListToString(questionIds))
                .build();

        workbookRepository.save(wb);
    }

    public void modifyWorkbook(WorkbookRequestReq workbookRequestReq, Long workbookId) {

        Workbook workbook = getWorkbookWithWorkbookId(workbookId);

        List<Long> questionIds = workbookRequestReq.getQuestionId();

        checkWorkbookWithCreatedByAndName(workbookRequestReq);

        workbook.changeWorkbook(workbookRequestReq.getWorkbookName(), changeListToString(questionIds));
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

    private String changeListToString(List<Long> ids) {
        StringBuilder sb = new StringBuilder();
        for (Long l : ids) {
            sb.append(l).append(" ");
        }
        return sb.toString();
    }
}
