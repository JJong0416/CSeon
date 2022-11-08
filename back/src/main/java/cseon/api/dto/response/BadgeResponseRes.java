package cseon.api.dto.response;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class BadgeResponseRes {

    @NotNull
    private final Long badgeId;

    @NotNull
    private final String badgeName;

    @NotNull
    private final String badgeExp;

    @Builder
    public BadgeResponseRes(Long badgeId, String badgeName, String badgeExp) {
        this.badgeId = badgeId;
        this.badgeName = badgeName;
        this.badgeExp = badgeExp;
    }
}
