package cseon.api.service;

import cseon.api.dto.request.WorkbookRequestDto;
import cseon.api.repository.WorkbookRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.List;

@Service("workbookService")
@Transactional
public class WorkbookService {
    @Autowired
    WorkbookRepository workbookRepository;

    //모든 workbook 조회
    public List<Workbook> getAllWorkbook() {
        List<Workbook> wb = workbookRepository.findAllWorkbooks().orElseThrow(() -> {
            throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
        });
        return wb;
    }

    public Workbook getWorkbook(int workbookId){
        Workbook wb = workbookRepository.findWorkbookByWorkbookId(workbookId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
        });
        return wb;
    }

    public void createWorkbook (WorkbookRequestDto workbookRequestDto){
        List<Long> quesId = workbookRequestDto.getQuestionId();
        if (workbookRepository.findWorkbooksByWorkbookCreatedByAndWorkbookName(workbookRequestDto.getWorkbookCreatedBy(), workbookRequestDto.getWorkbookName()).isPresent()){
            throw new CustomException(ErrorCode.WORKBOOK_NAME_ALREADY_EXISTS);
        }
        Workbook wb = Workbook.builder().workbookCreatedBy(workbookRequestDto.getWorkbookCreatedBy()).workbookName(workbookRequestDto.getWorkbookName()).questionList(toString(quesId)).build();
        workbookRepository.save(wb);
    }

    public void modifyWorkbook(WorkbookRequestDto workbookRequestDto, int workbookId){
        Workbook workbook = workbookRepository.findWorkbookByWorkbookId(workbookId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
        });
        List<Long> quesId = workbookRequestDto.getQuestionId();
        if (workbookRepository.findWorkbooksByWorkbookCreatedByAndWorkbookName(workbookRequestDto.getWorkbookCreatedBy(), workbookRequestDto.getWorkbookName()).isPresent()){
            throw new CustomException(ErrorCode.WORKBOOK_NAME_ALREADY_EXISTS);
        }
        workbook.updateWorkbook(workbookRequestDto.getWorkbookName(), toString(quesId));
    }

    public String toString(List<Long> ids){
        StringBuilder sb = new StringBuilder();
        for (Long l : ids){
            sb.append(l).append(" ");
        }
        return sb.toString();
    }




}
