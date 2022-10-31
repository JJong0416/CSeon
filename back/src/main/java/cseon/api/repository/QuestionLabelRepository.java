package cseon.api.repository;

import cseon.domain.QuestionLabel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionLabelRepository extends JpaRepository<QuestionLabel, Long> {

//    @Query("SELECT ql FROM QuestionLabel ql LEFT JOIN FETCH ql.labelId")
//    List<QuestionLabel> findQuestionLabelByLabelId(Long labelId);
//    @Query("SELECT QL FROM QuestionLabel QL LEFT JOIN FETCH QL.LabelId WHERE QL.LabelId =: labelId")
//    List<QuestionLabel> findQuestionLabelByLabelIdAndKeyword(Long labelId);
}
