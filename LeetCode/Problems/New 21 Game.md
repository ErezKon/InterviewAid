# 837. New 21 Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/new-21-game](https://leetcode.com/problems/new-21-game)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + Sliding Window — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Draw cards 1..maxPts uniformly. Stop when total ≥ k. Return the probability that total ≤ n.

**Constraints:**
- `0 <= k <= n <= 10⁴`

---

## 2. Key Insight

> `dp[i]` = probability of reaching exactly score `i`. Transition: `dp[i] = sum(dp[i-1..i-maxPts]) / maxPts`. Use a sliding window sum to avoid O(maxPts) per state. Only add `dp[i]` to window if `i < k` (still drawing).

---

## 3. Approach: DP + Sliding Window — O(n) ✅

```
FUNCTION new21Game(n, k, maxPts):
    IF k == 0 OR n >= k + maxPts: RETURN 1.0
    dp = [0.0] * (n + 1)
    dp[0] = 1.0
    windowSum = 1.0

    FOR i ← 1 TO n:
        dp[i] = windowSum / maxPts
        IF i < k: windowSum += dp[i]
        IF i >= maxPts: windowSum -= dp[i - maxPts]

    RETURN SUM(dp[k:n+1])
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Probability DP with sliding window optimization.** The window tracks the sum of reachable states. Key detail: stop adding to window at `i = k` since we stop drawing at that point.
