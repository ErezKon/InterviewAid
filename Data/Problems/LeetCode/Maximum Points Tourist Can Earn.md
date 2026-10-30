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

You are given two integers, `n` and `k`, along with two 2D integer arrays, `stayScore` and `travelScore`.

A tourist is visiting a country with `n` cities, where each city is **directly** connected to every other city. The tourist's journey consists of **exactly** `k` **0-indexed** days, and they can choose **any** city as their starting point.

Each day, the tourist has two choices:

- **Stay in the current city**: If the tourist stays in their current city `curr` during day `i`, they will earn `stayScore[i][curr]` points.
- **Move to another city**: If the tourist moves from their current city `curr` to city `dest`, they will earn `travelScore[curr][dest]` points.

Return the **maximum** possible points the tourist can earn.

**Constraints:**
- `1 <= n <= 200`
- `1 <= k <= 200`
- `n == travelScore.length == travelScore[i].length == stayScore[i].length`
- `k == stayScore.length`
- `1 <= stayScore[i][j] <= 100`
- `0 <= travelScore[i][j] <= 100`
- `travelScore[i][i] == 0`

---

## Examples

```
Example 1:
  Input: n = 2, k = 1, stayScore = [[2,3]], travelScore = [[0,2],[1,0]]
  Output: 3
  Explanation: The tourist earns the maximum number of points by starting in city 1 and staying in that city.
```

```
Example 2:
  Input: n = 3, k = 2, stayScore = [[3,4,2],[2,1,2]], travelScore = [[0,2,1],[2,0,4],[3,2,0]]
  Output: 8
  Explanation: The tourist earns the maximum number of points by starting in city 1, staying in that city on day 0,
    and traveling to city 2 on day 1.
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
