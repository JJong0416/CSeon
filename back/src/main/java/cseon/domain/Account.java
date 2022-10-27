package cseon.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Set;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "account")
@Getter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "account_role")
    private Boolean accountRole;

    @Column(name = "success_count")
    private Integer successCount;

    @Column(name = "using_badge_id")
    private Long usingBadgeId;

    @OneToMany(targetEntity = AccountBadge.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "account_badge_id")
    private Set<AccountBadge> myBadges;

    @OneToMany(targetEntity = AccountRequestQuestion.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "account_request_question_id")
    private Set<AccountRequestQuestion> myRequestQuestions;
}
