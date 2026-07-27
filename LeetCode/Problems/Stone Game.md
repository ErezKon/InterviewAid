# 877. Stone Game

**Difficulty:** 🟡 Medium
**Acceptance:** 70.0%
**LeetCode:** [https://leetcode.com/problems/stone-game](https://leetcode.com/problems/stone-game)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Approach 1: Math — O(1) ✅

Alice always wins (she can choose all even-indexed or all odd-indexed piles). `return true`.

## Approach 2: DP — O(n²)

For the general case (Stone Game variants):

```
FUNCTION stoneGame(piles):
    n = len(piles)
    dp = n×n matrix
    FOR i ← 0 TO n-1: dp[i][i] = piles[i]

    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j = i + length - 1
            dp[i][j] = MAX(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])

    RETURN dp[0][n-1] > 0
```

`dp[i][j]` = max score advantage of the current player for piles[i..j].
