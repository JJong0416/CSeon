package cseon.api.service;

import cseon.api.dto.response.BadgeResponseDto;
import cseon.api.repository.AccountBadgeRepository;
import cseon.api.repository.BadgeRepository;
import cseon.domain.Account;
import cseon.domain.AccountBadge;
import cseon.domain.Badge;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AccountBadgeRepository accountBadgeRepository;
    private final BadgeRepository badgeRepository;

    public List<BadgeResponseDto> getMyBadge(Account account) {
        List<AccountBadge> accountBadges = accountBadgeRepository.findByAccount(account);
        List<BadgeResponseDto> badges = new LinkedList<>();
        for (AccountBadge accountBadge : accountBadges) {
            Badge badge = badgeRepository.findById(accountBadge.getBadgeId()).orElseThrow(() -> {
                throw new NullPointerException("해당 칭호가 존재하지 않습니다.");
            });
            badges.add(BadgeResponseDto.builder()
                    .badgeId(badge.getBadgeId())
                    .badgeName(badge.getBadgeName())
                    .badgeExp(badge.getBadgeExp()).build());

        }
        return badges;
    }
}
