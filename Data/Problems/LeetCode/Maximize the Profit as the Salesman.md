# 2830. Maximize the Profit as the Salesman

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-the-profit-as-the-salesman](https://leetcode.com/problems/maximize-the-profit-as-the-salesman)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP (Weighted Job Scheduling) — O(n log n)](#approach-dp-weighted-job-scheduling--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` houses (0 to n-1) and a list of offers `[start, end, gold]`, sell non-overlapping ranges of houses to maximize total gold. Each offer buys houses from `start` to `end` inclusive for `gold` amount.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ offers.length ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  n = 5, offers = [[0,0,1],[0,2,2],[1,3,2]]
Output: 3
Explanation: Sell [0,0] for 1 and [1,3] for 2 → total 3.
```

---

## Key Insight

> This is **Weighted Job Scheduling**. Sort offers by end position. `dp[i]` = max gold selling houses 0..i. For each offer ending at `e`, `dp[e] = max(dp[e], dp[s-1] + gold)`.

---

## Approach: DP (Weighted Job Scheduling) — O(n log n) ✅

```
FUNCTION maximizeTheProfit(n, offers):
    // Group offers by end position
    endMap = defaultdict(list)
    FOR (s, e, g) IN offers:
        endMap[e].APPEND((s, g))

    dp = [0] * (n + 1)    // dp[i] = max gold from houses 0..i-1
    FOR i ← 1 TO n:
        dp[i] = dp[i - 1]    // don't sell house i-1
        FOR (s, g) IN endMap[i - 1]:
            dp[i] = MAX(dp[i], dp[s] + g)

    RETURN dp[n]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n + m)** | O(n + m) |

Where m = number of offers.

---

## Key Takeaway

> **"Maximize profit from non-overlapping intervals" = Weighted Job Scheduling.** DP indexed by end position, grouping offers by their end point for efficient transitions.
