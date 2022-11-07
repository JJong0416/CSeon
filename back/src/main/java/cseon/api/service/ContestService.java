package cseon.api.service;

import cseon.api.dto.response.ContestInfoRes;
import cseon.api.dto.response.ContestMyRankingRes;
import cseon.common.constant.RedisConst;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static cseon.common.utils.SecurityUtils.getAccountName;

@RequiredArgsConstructor
@Service
public class ContestService extends RedisConst {

    private final RedisTemplate<String, String> redisTemplate;

    /**
     * 기능 구현을 할 부분
     * 1. 1위 ~ 10위까지 데이터 가져오기
     * 2. 자기 순위 가져오기
     * 3. 처음 접속을 했을 때, 내 nickname key 값에 0 Init 해주기
     * 4. 문제를 해결했을 때, 나의 leaderBoard 갱신하기.
     */


    public ContestInfoRes sendAllContestInfo(Long contestId){

        return null;
    }

    public List<?> SearchRankList(Long contestId) {
        ZSetOperations<String, String> ZSetOperations = redisTemplate.opsForZSet();

        Set<ZSetOperations.TypedTuple<String>> typedTuples =
                ZSetOperations.reverseRangeWithScores(String.valueOf(contestId), 0, 9);

        return null;
    }
}
