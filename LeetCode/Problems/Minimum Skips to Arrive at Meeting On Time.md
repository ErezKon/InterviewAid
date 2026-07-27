# 1883. Minimum Skips to Arrive at Meeting On Time

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time](https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n²)](#3-approach-dp--on²)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` roads with distances, a speed, and a deadline `hoursBefore`, after each road (except the last) you must wait until the next integer hour unless you **skip** the rest. Return the **minimum** skips to arrive on time, or `-1`.

**Constraints:**
- `1 <= n <= 1000`
- `1 <= dist[i], speed <= 10⁶`
- `1 <= hoursBefore <= 10⁷`

---

## 2. Key Insight

> `dp[i][j]` = minimum time to travel the first `i` roads using exactly `j` skips. For each road, either skip the rest (no ceiling) or wait (ceiling to next integer hour). Find the minimum `j` where `dp[n][j] <= hoursBefore`.

---

## 3. Approach: DP — O(n²) ✅

```
FUNCTION minSkips(dist, speed, hoursBefore):
    n = len(dist)
    dp = (n+1) × (n+1) array of infinity
    dp[0][0] = 0

    FOR i ← 1 TO n:
        FOR j ← 0 TO i:
            // Don't skip: wait until next integer hour
            IF j <= i - 1:
                dp[i][j] = MIN(dp[i][j], CEIL(dp[i-1][j] + dist[i-1]/speed))
            // Skip: no rounding
            IF j >= 1:
                dp[i][j] = MIN(dp[i][j], dp[i-1][j-1] + dist[i-1]/speed)

    // Don't ceil the last road
    FOR j ← 0 TO n:
        IF dp[n][j] <= hoursBefore:
            RETURN j
    RETURN -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²), optimizable to O(n) |

---

## 5. Key Takeaway

> **DP on skips** — `dp[i][j]` tracks minimum time with `j` skips through `i` roads. The ceiling operation models waiting; skipping avoids it. Use floating point carefully (or multiply by speed to work with integers).
