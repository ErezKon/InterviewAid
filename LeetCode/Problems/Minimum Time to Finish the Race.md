# 2188. Minimum Time to Finish the Race

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-finish-the-race](https://leetcode.com/problems/minimum-time-to-finish-the-race)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Precompute + DP — O(n + numLaps)](#3-approach-precompute--dp)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given tire types with `[fi, ri]` (first lap time `fi`, each next lap multiplied by `ri`), a tire change costs `changeTime`. Complete `numLaps` total. Return **minimum** time.

**Constraints:**
- `1 <= tires.length <= 10⁵`
- `1 <= numLaps <= 1000`

---

## 2. Key Insight

> Each tire has diminishing returns — after ~18 laps the time exceeds `changeTime + fi` (it's better to switch). Precompute `best[j]` = minimum time to do `j` consecutive laps on any single tire. Then DP: `dp[i]` = min time for `i` laps, trying all splits: `dp[i] = min(dp[i-j] + changeTime + best[j])`.

---

## 3. Approach: Precompute + DP — O(n + numLaps) ✅

```
FUNCTION minimumFinishTime(tires, changeTime, numLaps):
    maxConsec = 18  // tire never worth more than ~18 laps
    best = [infinity] * (maxConsec + 1)
    
    FOR (f, r) IN tires:
        total = 0; lapTime = f
        FOR j ← 1 TO maxConsec:
            total += lapTime
            best[j] = MIN(best[j], total)
            lapTime *= r
            IF lapTime > changeTime + f: BREAK
    
    dp = [infinity] * (numLaps + 1)
    dp[0] = -changeTime  // offset first tire (no change needed)
    
    FOR i ← 1 TO numLaps:
        FOR j ← 1 TO MIN(i, maxConsec):
            dp[i] = MIN(dp[i], dp[i-j] + changeTime + best[j])
    
    RETURN dp[numLaps]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 18 + numLaps · 18) ≈ O(n + numLaps) |
| **Space** | O(numLaps) |

---

## 5. Key Takeaway

> **Bounded consecutive laps + DP.** Exponential tire degradation limits useful laps to ~18. Precompute best cost for 1..18 consecutive laps, then DP on total laps with tire-change transitions.
