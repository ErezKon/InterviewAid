# 3332. Maximum Points Tourist Can Earn

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-points-tourist-can-earn](https://leetcode.com/problems/maximum-points-tourist-can-earn)
**Companies:** De Shaw

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A tourist visits `n` cities over `k` days. On each day, they can stay or travel. `stayScore[i][j]` = points for staying in city `j` on day `i`. `travelScore[j1][j2]` = points for traveling from city `j1` to `j2`. Return the **maximum total points**.

**Constraints:**
- `1 <= n, k <= 200`

---

## Examples

**Example 1:**
```
Input:  n=2, k=1, stayScore=[[2,3]], travelScore=[[0,2],[1,0]]
Output: 3
Explanation: Start at city 1, stay → earn 3.
```

---

## Key Insight

> **DP**: `dp[day][city]` = max points at city on given day. Transition: either stayed (from same city) or traveled (from any other city).

---

## Approach

```
FUNCTION maxScore(n, k, stayScore, travelScore)
    dp ← 2D array [k+1][n], initialized to 0

    FOR day ← 0 TO k-1 DO
        FOR city ← 0 TO n-1 DO
            // Option 1: stay
            dp[day+1][city] ← MAX(dp[day+1][city], dp[day][city] + stayScore[day][city])
            // Option 2: travel to other cities
            FOR dest ← 0 TO n-1 DO
                dp[day+1][dest] ← MAX(dp[day+1][dest], dp[day][city] + travelScore[city][dest])

    RETURN MAX(dp[k])
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(k × n²)** — for each day, try all city pairs |
| Space  | **O(k × n)** — DP table |

---

## Key Takeaway

> **Standard DP on (day, city)** — at each step, either stay (same city bonus) or travel (city-pair bonus). Enumerate all transitions.
