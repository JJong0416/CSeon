package cseon.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "account_solved")
public class SolvedQuestion {

    @Id
    private String id;

    private List<Long> correctQuestion;

    private List<Long> wrongQuestion;

    public SolvedQuestion(String id){
        this.id = id;
        this.correctQuestion = new LinkedList<>();
        this.wrongQuestion = new LinkedList<>();
    }

    public void nullCheck(){
        if(correctQuestion == null)
            correctQuestion = new LinkedList<>();

        if(wrongQuestion == null)
            wrongQuestion = new LinkedList<>();
    }
}
