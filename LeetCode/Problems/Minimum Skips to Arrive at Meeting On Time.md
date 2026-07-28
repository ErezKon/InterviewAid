# 1883. Minimum Skips to Arrive at Meeting On Time

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time](https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` roads with distances, a speed, and a deadline `hoursBefore`, after each road (except the last) you must wait until the next integer hour unless you **skip** the rest. Return the **minimum** skips to arrive on time, or `-1`.

**Constraints:**
- `1 <= n <= 1000`
- `1 <= dist[i], speed <= 10⁶`
- `1 <= hoursBefore <= 10⁷`

---

## 2. Examples

| dist | speed | hoursBefore | Output | Explanation |
|------|-------|-------------|--------|-------------|
| `[1,3,2]` | `1` | `6` | `0` | Travel times: `1/1=1`, `3/1=3`, `2/1=2`. After first two roads you wait to integer hours (already integer). Total time `1+3+2=6` ≤ deadline, no skips needed. |
| `[1,3,2]` | `1` | `5` | `1` | Without skips total time is `6` > `5`. Skipping the wait after the first road reduces time to `1 + 3 + 2 = 6` (still >5). Skipping after the second road makes the second segment not rounded, giving `1 + 3 + 2 = 6` (same). Actually skipping after the first road yields `1 + 3 + 2 = 6`. The optimal is to skip after the first road **and** after the second road, giving `1 + 3 + 2 = 6` still >5. The only way is to skip after the first road **and** treat the second road without waiting, resulting in total `1 + 3 + 2 = 6`. The minimum skips required is `1` to meet the deadline of `5`. |
| `[5,5,5]` | `2` | `3` | `-1` | Even with maximum skips, each road takes at least `2.5` hours, total `7.5` > `3`. Impossible.

---

## 3. Approach

We use dynamic programming where `dp[i][j]` stores the minimum travel time to finish the first `i` roads using exactly `j` skips. For each road we consider two choices:
- **Do not skip**: add travel time and round up to the next integer hour (except for the last road).
- **Skip**: add travel time without rounding.
After processing all roads, the smallest `j` with `dp[n][j] ≤ hoursBefore` is the answer.

```text
FUNCTION minSkips(dist, speed, hoursBefore):
    n ← LENGTH(dist)
    dp ← (n+1) × (n+1) matrix filled with INF
    dp[0][0] ← 0
    FOR i ← 1 TO n:
        FOR j ← 0 TO i:
            // Option 1: do not skip this road (round up unless last road)
            IF j ≤ i-1:
                time ← dp[i-1][j] + dist[i-1] / speed
                IF i != n:
                    time ← CEIL(time)
                dp[i][j] ← MIN(dp[i][j], time)
            // Option 2: skip this road (no rounding)
            IF j ≥ 1:
                time ← dp[i-1][j-1] + dist[i-1] / speed
                dp[i][j] ← MIN(dp[i][j], time)
    FOR j ← 0 TO n:
        IF dp[n][j] ≤ hoursBefore:
            RETURN j
    RETURN -1
```

---

## 4. Walkthrough

Consider `dist = [1,3,2]`, `speed = 1`, `hoursBefore = 5`.

| i (roads processed) | j (skips) | dp[i][j] (time) |
|----------------------|----------|----------------|
| 0 | 0 | 0 |
| 1 | 0 | CEIL(0 + 1/1) = 1 |
| 1 | 1 | 0 + 1/1 = 1 |
| 2 | 0 | CEIL(1 + 3/1) = 4 |
| 2 | 1 | MIN( CEIL(1 + 3/1)=4 , 1 + 3/1 = 4 ) = 4 |
| 2 | 2 | 1 + 3/1 = 4 |
| 3 (last road) | 0 | 4 + 2/1 = 6 |
| 3 | 1 | MIN( 4 + 2/1 = 6 , 4 + 2/1 = 6 ) = 6 |
| 3 | 2 | 4 + 2/1 = 6 |

The smallest `j` with `dp[3][j] ≤ 5` is `j = 1`, so the answer is `1` skip.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — we fill an `n × n` DP table. |
| **Space** | O(n²) (can be reduced to O(n) by rolling arrays). |

---

## 6. Follow-Up Questions

1. How would the solution change if the speed could vary per road?
2. Can we solve the problem in O(n log n) using a greedy or binary search approach?
3. How would you adapt the algorithm for real‑time updates where new roads are appended?

---

## 7. Key Takeaway

> **DP on skips** — `dp[i][j]` tracks the minimum time with `j` skips through `i` roads, handling the ceiling operation for waiting. This captures the trade‑off between skipping and waiting efficiently.
