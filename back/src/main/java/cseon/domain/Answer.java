package cseon.domain;

import cseon.domain.type.RequestQuestionType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "answer")
public class Answer {
    @Id
    private String id;
    private Long questionId;
    private RequestQuestionType request;
    private List<String> answers;
    private Integer rightAnswer;

    public Answer(Long questionId, RequestQuestionType request, List<String> answers, Integer rightAnswer) {
        this.questionId = questionId;
        this.request = request;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }

    @Builder
    public Answer(String id, Long questionId, RequestQuestionType request, List<String> answers, Integer rightAnswer) {
        this(questionId, request, answers, rightAnswer);
        this.id = id;
    }

    public void allowAnswer(Long questionId, List<String> answers, Integer rightAnswer) {
        this.questionId = questionId;
        this.request = RequestQuestionType.FORMAL;
        modifyAnswer(answers, rightAnswer);
    }

    public void modifyAnswer(List<String> answers, Integer rightAnswer) {
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }
}
