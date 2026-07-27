# 1626. Best Team With No Conflicts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-team-with-no-conflicts](https://leetcode.com/problems/best-team-with-no-conflicts)
**Companies:** Blinkit, Google, Morgan Stanley

---

```
FUNCTION bestTeamScore(scores, ages):
    players = sorted(zip(ages, scores))
    n = len(players)
    dp = [s for _, s in players]
    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF players[j][1] <= players[i][1]:
                dp[i] = MAX(dp[i], dp[j] + players[i][1])
    RETURN MAX(dp)
```

LIS-style DP after sorting by age then score.
