package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Getter
public class BadgeResponseDto {
    @Id
    @NotNull
    private Long badgeId;
    @NotNull
    private String badgeName;
    @NotNull
    private String badgeExp;

    @Builder
    public BadgeResponseDto(Long badgeId, String badgeName, String badgeExp) {
        this.badgeId = badgeId;
        this.badgeName = badgeName;
        this.badgeExp = badgeExp;
    }
}
