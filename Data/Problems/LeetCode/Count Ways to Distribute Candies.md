# 1692. Count Ways to Distribute Candies

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-distribute-candies](https://leetcode.com/problems/count-ways-to-distribute-candies)
**Companies:** Google

---

## Problem Description

There are `n` **unique** candies (labeled `1` through `n`) and `k` bags. You are asked to distribute **all** the candies into the bags such that every bag has **at least** one candy.

There can be multiple ways to distribute the candies. Two ways are considered **different** if the candies in one bag in the first way are not all in the same bag in the second way. The order of the bags and the order of the candies within each bag do not matter.

For example, `(1), (2,3)` and `(2), (1,3)` are considered different because candies `2` and `3` in the bag `(2,3)` in the first way are not in the same bag in the second way (they are split between the bags `(2)` and `(1,3)`). However, `(1), (2,3)` and `(3,2), (1)` are considered the same because the candies in each bag are all in the same bags in both ways.

Given two integers, `n` and `k`, return *the **number** of different ways to distribute the candies*. As the answer may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= k <= n <= 1000`

---

## Examples

```
Example 1:
  Input: n = 3, k = 2
  Output: 3
  Explanation: You can distribute 3 candies into 2 bags in 3 ways:
  (1), (2,3)
  (1,2), (3)
  (1,3), (2)
```

```
Example 2:
  Input: n = 4, k = 2
  Output: 7
  Explanation: You can distribute 4 candies into 2 bags in 7 ways:
  (1), (2,3,4)
  (1,2), (3,4)
  (1,3), (2,4)
  (1,4), (2,3)
  (1,2,3), (4)
  (1,2,4), (3)
  (1,3,4), (2)
```

```
Example 3:
  Input: n = 20, k = 5
  Output: 206085257
  Explanation: You can distribute 20 candies into 5 bags in 749206090500 ways. 749206090500 modulo 10^9 + 7 = 206085257.
```

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

> **Distributing n distinct items into k non-empty indistinguishable groups equals the Stirling number S(n,k). The recurrence `S(n,k) = k·S(n-1,k) + S(n-1,k-1)` enables an O(n·k) DP solution.**