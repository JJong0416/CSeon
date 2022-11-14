package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class BadgeRes {

    @NotNull
    private final Long badgeId;

    @NotNull
    private final String badgeName;

    @NotNull
    private final String badgeExp;

    @Builder
    public BadgeRes(Long badgeId, String badgeName, String badgeExp) {
        this.badgeId = badgeId;
        this.badgeName = badgeName;
        this.badgeExp = badgeExp;
    }
}
