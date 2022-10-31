package cseon.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@NoArgsConstructor
@Document(collection = "answer")
public class Answer {

    private Long questionId;
    private Boolean request;
    private List<String> answers;
    private Integer rightAnswer;

    @Builder
    public Answer(Long questionId, Boolean request, List<String> answers, Integer rightAnswer) {
        this.questionId = questionId;
        this.request = request;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("questionId : ").append(questionId).append("\n").append(" request : ").append(request).append("\n");
        for (int i = 0; i < answers.size(); i++) {
            sb.append(i).append(" : ").append(answers.get(i)).append("\n");
        }
        sb.append("rightAnswer : ").append(rightAnswer);
        return sb.toString();

    }
}