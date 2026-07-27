# 1692. Count Ways to Distribute Candies

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-distribute-candies](https://leetcode.com/problems/count-ways-to-distribute-candies)
**Companies:** Google

---

## Problem Description

Distribute `n` unique candies into `k` bags (each bag non-empty, bags are indistinguishable within). This is the **Stirling number of the second kind** S(n, k).

---

## Key Insight

`S(n, k) = k × S(n-1, k) + S(n-1, k-1)`: either add the new candy to one of `k` existing bags, or start a new bag with it.

---

## Approach

```
FUNCTION waysToDistribute(n, k):
    MOD = 10^9 + 7
    // dp[i][j] = S(i, j) = Stirling number of second kind
    dp = [[0]*(k+1) for _ in range(n+1)]
    dp[0][0] = 1

    FOR i ← 1 TO n:
        FOR j ← 1 TO MIN(i, k):
            dp[i][j] = (j * dp[i-1][j] + dp[i-1][j-1]) % MOD

    RETURN dp[n][k]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × k) |
| **Space** | O(n × k), reducible to O(k) |

---

## Key Takeaway

> **Distributing n distinct items into k non-empty indistinguishable groups = Stirling number S(n,k). Recurrence: `S(n,k) = k·S(n-1,k) + S(n-1,k-1)`.**
