package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "account_request_question")
@Getter
public class AccountRequestQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_request_question_id")
    private Long accountRequestQuestionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(name = "request_question_title", nullable = false)
    private String requestQuestionTitle;

    @Lob
    @Column(name = "request_question_exp", nullable = false)
    private String requestQuestionExp;

    @Column(name = "request_question_ans", nullable = false)
    private Integer requestQuestionAns;

    @Builder
    public AccountRequestQuestion(Account account, String requestQuestionTitle, String requestQuestionExp, Integer requestQuestionAns) {
        this.account = account;
        this.requestQuestionTitle = requestQuestionTitle;
        this.requestQuestionExp = requestQuestionExp;
        this.requestQuestionAns = requestQuestionAns;
    }
}
