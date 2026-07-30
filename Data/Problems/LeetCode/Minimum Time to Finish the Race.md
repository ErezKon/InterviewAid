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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a list of tire types, each described by `[fi, ri]` where `fi` is the time for the first lap on that tire and each subsequent lap time is multiplied by `ri`. Changing tires costs `changeTime` seconds. You must complete `numLaps` laps. Return the **minimum** total time to finish the race.

**Constraints:**
- `1 <= tires.length <= 10⁵`
- `1 <= numLaps <= 1000`

---

## 2. Key Insight

> Each tire becomes inefficient after a small number of consecutive laps because the lap time grows exponentially. After roughly 18 laps the time exceeds `changeTime + fi`, so it is always better to switch. Pre‑compute the cheapest way to run `j` consecutive laps on any tire for `j = 1 … 18`. Then use DP: `dp[i]` = minimum time to finish `i` laps, trying every possible last stint length `j`.

---

## 3. Approach: Precompute + DP — O(n + numLaps) ✅

```text
FUNCTION minimumFinishTime(tires, changeTime, numLaps):
    maxConsec ← 18
    best ← ARRAY[0..maxConsec] FILLED WITH INFINITY
    FOR EACH (f, r) IN tires:
        total ← 0
        lapTime ← f
        FOR j ← 1 TO maxConsec:
            total ← total + lapTime
            best[j] ← MIN(best[j], total)
            lapTime ← lapTime * r
            IF lapTime > changeTime + f:
                BREAK
    dp ← ARRAY[0..numLaps] FILLED WITH INFINITY
    dp[0] ← -changeTime   // first stint does not need a tire change
    FOR i ← 1 TO numLaps:
        FOR j ← 1 TO MIN(i, maxConsec):
            dp[i] ← MIN(dp[i], dp[i-j] + changeTime + best[j])
    RETURN dp[numLaps]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · maxConsec + numLaps · maxConsec) ≈ O(n + numLaps) |
| **Space** | O(numLaps) |

---

## 5. Examples

**Example 1:**
```
Input: tires = [[2,3],[3,4]], changeTime = 5, numLaps = 4
Output: 21
Explanation:
- Use tire 0 for 2 laps: 2 + 2*3 = 8
- Change (5) and use tire 0 for remaining 2 laps: 2 + 2*3 = 8
Total = 8 + 5 + 8 = 21, which is optimal.
```

**Example 2:**
```
Input: tires = [[1,2]], changeTime = 10, numLaps = 3
Output: 7
Explanation: No tire change is needed. Lap times: 1, 2, 4 → total 7.
```

---

## 6. Walkthrough

Consider Example 1 (`numLaps = 4`).
| Step | Stint length `j` considered | `best[j]` (cheapest `j` laps) | DP transition `dp[i] = dp[i-j] + changeTime + best[j]` |
|------|----------------------------|------------------------------|---------------------------------------------------|
| i=1 | j=1 → best[1]=2 | dp[1] = dp[0] + 5 + 2 = 7 |
| i=2 | j=2 → best[2]=8 | dp[2] = dp[0] + 5 + 8 = 13 |
| i=3 | j=1 → dp[2]+5+2 = 20; j=2 → dp[1]+5+8 = 20; j=3 → best[3]=? ( > changeTime) ignored |
| i=4 | j=2 → dp[2]+5+8 = 26; j=4 → best[4]=? ( > changeTime) ignored; best solution uses two stints of length 2 giving 21 as computed earlier. |
The DP ultimately picks the combination that yields 21.

---

## 7. Key Takeaway

> **Bound the useful consecutive laps, pre‑compute cheapest stints, then DP over total laps.** This reduces an exponential search to linear time.
