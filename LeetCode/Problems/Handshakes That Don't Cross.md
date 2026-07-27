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

---

## 1. Problem Description

`2n` people in a circle. Count the number of ways they can pair up for handshakes such that no two handshakes cross.

---

## 2. Key Insight

> This is the n-th Catalan number: `C(n) = C(2n, n) / (n+1)`. Each non-crossing perfect matching corresponds to a Catalan structure.

---

## 3. Approach: Catalan Number — O(n) ✅

```
FUNCTION numberOfWays(numPeople):
    n ← numPeople / 2
    dp ← [0] * (n + 1); dp[0] ← 1
    FOR i ← 1 TO n DO
        FOR j ← 0 TO i - 1 DO
            dp[i] += dp[j] * dp[i - 1 - j]
        dp[i] %= MOD
    RETURN dp[n]
```

---

## 4. Key Takeaway

> Non-crossing matchings in a circle = Catalan number. Computable via DP recurrence `C(n) = Σ C(j) · C(n-1-j)`.
