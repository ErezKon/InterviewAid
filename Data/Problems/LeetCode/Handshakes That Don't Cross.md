# 1259. Handshakes That Don't Cross

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/handshakes-that-dont-cross](https://leetcode.com/problems/handshakes-that-dont-cross)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Catalan Number — O(n) ✅](#3-approach-catalan-number--on-)
4. [Key Takeaway](#4-key-takeaway)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

`2n` people in a circle. Count the number of ways they can pair up for handshakes such that no two handshakes cross.

---

## 2. Key Insight

> This is the n-th Catalan number: `C(n) = C(2n, n) / (n+1)`. Each non-crossing perfect matching corresponds to a Catalan structure.

---

## 3. Approach: Catalan Number — O(n) ✅

```text
FUNCTION numberOfWays(numPeople):
    n ← numPeople / 2
    dp ← [0] * (n + 1)
    dp[0] ← 1
    FOR i ← 1 TO n DO
        FOR j ← 0 TO i - 1 DO
            dp[i] += dp[j] * dp[i - 1 - j]
        dp[i] %= MOD
    RETURN dp[n]
```

---

## 4. Key Takeaway

> Non-crossing matchings in a circle = Catalan number. Computable via DP recurrence `C(n) = Σ C(j) · C(n-1-j)`.

---

## 5. Examples

| Input | Output |
|-------|--------|
| `numPeople = 2` | `1` |
| `numPeople = 4` | `2` |
| `numPeople = 6` | `5` |

---

## 6. Walkthrough

Consider `numPeople = 6` (`n = 3`). The DP builds Catalan numbers:
1. `dp[0] = 1`
2. `dp[1] = dp[0]*dp[0] = 1`
3. `dp[2] = dp[0]*dp[1] + dp[1]*dp[0] = 2`
4. `dp[3] = dp[0]*dp[2] + dp[1]*dp[1] + dp[2]*dp[0] = 5`
Thus there are 5 non‑crossing handshake configurations.

---

## 7. Complexity Analysis

- **Time:** `O(n^2)` due to the double loop computing Catalan DP.
- **Space:** `O(n)` for the DP array.

---

## 8. Follow-Up Questions

- How would you compute the result for very large `n` modulo a prime?
- Can the problem be solved using combinatorial formulas without DP?
- How does the solution change if handshakes are allowed to cross?