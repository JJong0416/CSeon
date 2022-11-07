package cseon.api.service;

import cseon.api.repository.LabelRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Label;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public Label getLabelIdByName(String labelName){
        return labelRepository.findByLabelName(labelName).orElseThrow(
                () -> new CustomException(ErrorCode.LABEL_NOT_FOUND)
        );
    }

    public Label getLabelNameById(Label label){
        return labelRepository.findById(label.getLabelId()).orElseThrow(
                () -> new CustomException(ErrorCode.LABEL_NOT_FOUND)
        );
    }
}
