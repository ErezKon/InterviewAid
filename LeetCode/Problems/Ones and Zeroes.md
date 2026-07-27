# 474. Ones and Zeroes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ones-and-zeroes](https://leetcode.com/problems/ones-and-zeroes)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Approach: 2D Knapsack DP — O(l·m·n) ✅

```
FUNCTION findMaxForm(strs, m, n):
    dp = (m+1) × (n+1) zeros

    FOR s IN strs:
        zeros = s.count('0')
        ones = s.count('1')
        FOR i ← m DOWN TO zeros:
            FOR j ← n DOWN TO ones:
                dp[i][j] = MAX(dp[i][j], dp[i-zeros][j-ones] + 1)

    RETURN dp[m][n]
```

0-1 knapsack with two dimensions (zeros and ones budgets).
