# 279. Perfect Squares

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/perfect-squares](https://leetcode.com/problems/perfect-squares)
**Companies:** Accenture, Amazon, Bloomberg, Citadel, Goldman Sachs, Google, Microsoft, Revolut, Walmart Labs, Yandex, Zoho

---

## Approach: DP (Unbounded Knapsack) — O(n√n) ✅

```
FUNCTION numSquares(n):
    dp = [infinity] * (n + 1)
    dp[0] = 0

    FOR i ← 1 TO n:
        j = 1
        WHILE j * j <= i:
            dp[i] = MIN(dp[i], dp[i - j*j] + 1)
            j += 1

    RETURN dp[n]
```

BFS alternative: each level tries subtracting all perfect squares.

By Lagrange's four-square theorem, answer is always ≤ 4.
