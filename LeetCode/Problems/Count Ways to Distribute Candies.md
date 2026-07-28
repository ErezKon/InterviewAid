# 1692. Count Ways to Distribute Candies

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-distribute-candies](https://leetcode.com/problems/count-ways-to-distribute-candies)
**Companies:** Google

---

## Problem Description

Distribute `n` unique candies into `k` bags (each bag non-empty, bags are indistinguishable within). This is the **Stirling number of the second kind** S(n, k).

---

## Examples

| n | k | Output |
|---|---|---|
| 3 | 2 | 3 |
| 4 | 2 | 7 |
| 5 | 3 | 25 |

*Explanation*: For `n = 3, k = 2`, the three valid partitions are `{ {c1,c2}, {c3} }, { {c1,c3}, {c2} }, { {c2,c3}, {c1} }`.

---

## Approach

```
text
FUNCTION waysToDistribute(n, k):
    MOD ← 1_000_000_007
    dp ← MATRIX of size (n+1) × (k+1) filled with 0
    dp[0][0] ← 1
    FOR i ← 1 TO n:
        FOR j ← 1 TO MIN(i, k):
            dp[i][j] ← (j * dp[i-1][j] + dp[i-1][j-1]) MOD MOD
    RETURN dp[n][k]
```

---

## Walkthrough

Consider `n = 4, k = 2`.
1. Initialize `dp[0][0] = 1`.
2. `i = 1`: `dp[1][1] = 1 * dp[0][1] + dp[0][0] = 1`.
3. `i = 2`: `dp[2][1] = 1 * dp[1][1] + dp[1][0] = 1`; `dp[2][2] = 2 * dp[1][2] + dp[1][1] = 1`.
4. `i = 3`: compute `dp[3][1] = 1`, `dp[3][2] = (2*dp[2][2] + dp[2][1]) = 2*1+1 = 3`.
5. `i = 4`: `dp[4][2] = (2*dp[3][2] + dp[3][1]) = 2*3+1 = 7`.
Result `dp[4][2] = 7` matches the example.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × k) |
| **Space** | O(n × k), reducible to O(k) |

---

## Follow-Up Questions

1. How would you compute the answer for very large `n` and `k` modulo a prime?
2. Can the recurrence be optimized to use only O(k) space?
3. How does the problem change if bags are distinguishable?

---

## Key Takeaway

> **Distributing n distinct items into k non‑empty indistinguishable groups equals the Stirling number S(n,k). The recurrence `S(n,k) = k·S(n‑1,k) + S(n‑1,k‑1)` enables an O(n·k) DP solution.**