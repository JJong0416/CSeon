package cseon.api.service;

import cseon.api.dto.response.LabelInfoRes;
import cseon.api.repository.LabelRepository;
import cseon.common.exception.CustomException;
import cseon.common.exception.ErrorCode;
import cseon.domain.Label;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LabelService {

    private final LabelRepository labelRepository;

    public List<LabelInfoRes> takeAllLabels(){
        return labelRepository.findAll().stream()
                .map(label -> LabelInfoRes.builder()
                        .labelName(label.getLabelName())
                        .build())
                .collect(Collectors.toList());
    }


    public Label getLabelIdByName(String labelName) {
        return labelRepository.findByLabelName(labelName)
                .orElseThrow(() -> new CustomException(ErrorCode.LABEL_NOT_FOUND));
    }

    public Label getLabelNameById(Label label) {
        return labelRepository.findById(label.getLabelId())
                .orElseThrow(() -> new CustomException(ErrorCode.LABEL_NOT_FOUND));
    }
}
