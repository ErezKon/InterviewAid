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

```text
FUNCTION new21Game(n, k, maxPts):
    IF k == 0 OR n >= k + maxPts: RETURN 1.0
    dp ← array of size n+1 filled with 0.0
    dp[0] ← 1.0
    windowSum ← 1.0

    FOR i ← 1 TO n:
        dp[i] ← windowSum / maxPts
        IF i < k: windowSum ← windowSum + dp[i]
        IF i >= maxPts: windowSum ← windowSum - dp[i - maxPts]

    RETURN SUM of dp[i] for i from k to n inclusive
```

---

## Examples

**Example 1:**
```
Input: n = 10, k = 1, maxPts = 10
Output: 1.0
Explanation: Player stops immediately because k = 1, and any draw results in a total ≤ 10.
```

**Example 2:**
```
Input: n = 6, k = 1, maxPts = 10
Output: 0.6
Explanation: Only draws of 1‑6 keep total ≤ 6. Probability = 6/10.
```

---

## Walkthrough

| i | windowSum before i | dp[i] | windowSum after i |
|---|--------------------|-------|-------------------|
| 0 | — | 1.0 | 1.0 (initial) |
| 1 | 1.0 | 1.0/10 = 0.1 | add dp[1] (i<k? no) → 1.0 |
| 2 | 1.0 | 1.0/10 = 0.1 | add dp[2] (i<k? no) → 1.0 |
| … | … | … | … |
| 6 | 1.0 | 0.1 | … |

Result sum dp[1..6] = 0.6.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Probability DP with sliding window optimization.** The window tracks the sum of reachable states. Key detail: stop adding to window at `i = k` since we stop drawing at that point.
