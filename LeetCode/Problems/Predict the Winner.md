# 486. Predict the Winner

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/predict-the-winner](https://leetcode.com/problems/predict-the-winner)
**Companies:** Amazon, Bloomberg, Cisco, Google, Microsoft, Uber

---

## Approach: Interval DP — O(n²) ✅

```
FUNCTION predictTheWinner(nums):
    n = len(nums)
    // dp[i][j] = max score difference (current player - opponent) for nums[i..j]
    dp = copy of nums on diagonal

    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j = i + length - 1
            dp[i][j] = MAX(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1])

    RETURN dp[0][n-1] >= 0
```

Minimax. Current player maximizes their advantage (pick left or right minus opponent's best).
