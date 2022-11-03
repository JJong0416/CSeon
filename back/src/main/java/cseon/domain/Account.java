package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
@Table(name = "account")
@Getter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "account_name", nullable = false)
    private String accountName;

    @Column(name = "account_role", nullable = false)
    private Boolean accountRole;

    @Column(name = "success_count", nullable = false)
    private Integer successCount;

    @Column(name = "using_badge_id")
    private Long usingBadgeId;

    public Account(long l, boolean b, int i, long l1) {
        this.accountId = l;
        this.accountRole = b;
        this.successCount = i;
        this.usingBadgeId = l1;
    }

    @Builder
    public Account(String accountName, Boolean accountRole, Integer successCount, Long usingBadgeId) {
        this.accountName = accountName;
        this.accountRole = accountRole;
        this.successCount = successCount;
        this.usingBadgeId = usingBadgeId;
    }
}
