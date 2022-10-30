package cseon.api.service;

import cseon.api.dto.request.WorkbookRequestDto;
import cseon.api.repository.WorkbookRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public Workbook getWorkbook(Long workbookId){
        Workbook wb = workbookRepository.findWorkbookByWorkbookId(workbookId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.WORKBOOK_NOT_FOUND);
        });
        return wb;
    }

    public void createWorkbook (WorkbookRequestDto workbookRequestDto){
        List<Long> quesId = workbookRequestDto.getQuestionId();
        Workbook wb = Workbook.builder().workbookName(workbookRequestDto.getWorkbookName()).build();
        workbookRepository.save(wb);
        // 여기서 workbook Id 받아서 가져온 다음 매칭시켜주려고 했어요!!
//        Workbook wkbk = workbookRepository.findWorkbookByWorkbookId().getWorkbookId();
//        for (Long a : quesId){
//            workbookRepository.save(a. wkbk);
//        }
    }

    public void modifyWorkbook(WorkbookRequestDto workbookRequestDto){
        List<Long> quesId = workbookRequestDto.getQuestionId();
        //여기서 workbook id 받아오기
        Long workbookId;

    }



}
