# 1140. Stone Game II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stone-game-ii](https://leetcode.com/problems/stone-game-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Approach: DP + Suffix Sum — O(n³) ✅

```
FUNCTION stoneGameII(piles):
    n = len(piles)
    suffixSum = suffix sums of piles
    memo = {}

    FUNCTION dp(i, m):
        IF i >= n: RETURN 0
        IF (i, m) IN memo: RETURN memo[(i, m)]

        best = 0
        FOR x ← 1 TO 2 * m:
            IF i + x > n: BREAK
            best = MAX(best, suffixSum[i] - dp(i + x, MAX(m, x)))

        memo[(i, m)] = best
        RETURN best

    RETURN dp(0, 1)
```

Current player takes 1..2M piles. Maximize own score = suffixSum - opponent's best.
