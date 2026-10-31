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

You are given a **0-indexed** 2D integer array `tires` where `tires[i] = [f_i, r_i]` indicates that the `i^th` tire can finish its `x^th` successive lap in `f_i * r_i^(x-1)` seconds.

- For example, if `f_i = 3` and `r_i = 2`, then the tire would finish its `1^st` lap in `3` seconds, its `2^nd` lap in `3 * 2 = 6` seconds, its `3^rd` lap in `3 * 2^2 = 12` seconds, etc.

You are also given an integer `changeTime` and an integer `numLaps`.

The race consists of `numLaps` laps and you may start the race with **any** tire. You have an **unlimited** supply of each tire and after every lap, you may **change** to any given tire (including the current tire type) if you wait `changeTime` seconds.

Return* the **minimum** time to finish the race.*

**Constraints:**
- `1 <= tires.length <= 10^5`
- `tires[i].length == 2`
- `1 <= f_i, changeTime <= 10^5`
- `2 <= r_i <= 10^5`
- `1 <= numLaps <= 1000`

---

## 2. Key Insight

> Each tire becomes inefficient after a small number of consecutive laps because the lap time grows exponentially. After roughly 18 laps the time exceeds `changeTime + fi`, so it is always better to switch. Pre-compute the cheapest way to run `j` consecutive laps on any tire for `j = 1 … 18`. Then use DP: `dp[i]` = minimum time to finish `i` laps, trying every possible last stint length `j`.

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
Explanation: Lap 1: Start with tire 0 and finish the lap in 2 seconds.
Lap 2: Continue with tire 0 and finish the lap in 2 * 3 = 6 seconds.
Lap 3: Change tires to a new tire 0 for 5 seconds and then finish the lap in another 2 seconds.
Lap 4: Continue with tire 0 and finish the lap in 2 * 3 = 6 seconds.
Total time = 2 + 6 + 5 + 2 + 6 = 21 seconds.
The minimum time to complete the race is 21 seconds.
```

**Example 2:**
```
Input: tires = [[1,10],[2,2],[3,4]], changeTime = 6, numLaps = 5
Output: 25
Explanation: Lap 1: Start with tire 1 and finish the lap in 2 seconds.
Lap 2: Continue with tire 1 and finish the lap in 2 * 2 = 4 seconds.
Lap 3: Change tires to a new tire 1 for 6 seconds and then finish the lap in another 2 seconds.
Lap 4: Continue with tire 1 and finish the lap in 2 * 2 = 4 seconds.
Lap 5: Change tires to tire 0 for 6 seconds then finish the lap in another 1 second.
Total time = 2 + 4 + 6 + 2 + 4 + 6 + 1 = 25 seconds.
The minimum time to complete the race is 25 seconds.
```

---

## 6. Walkthrough

Consider Example 1 (`numLaps = 4`).
| Step | Stint length `j` considered | `best[j]` (cheapest `j` laps) | DP transition `dp[i] = dp[i-j] + changeTime + best[j]` |
|------|----------------------------|------------------------------|---------------------------------------------------|
| i=1 | j=1 → best[1]=2 | dp[1] = dp[0] + 5 + 2 = 7 |
| i=2 | j=2 → best[2]=8 | dp[2] = dp[0] + 5 + 8 = 13 |
| i=3 | j=1 → dp[2]+5+2 = 20; j=2 → dp[1]+5+8 = 20; j=3 → best[3]=? ( > changeTime) ignored |
| i=4 | j=2 → dp[2]+5+8 = 26; j=4 → best[4]=? ( > changeTime) ignored; best solution uses two stints of length 2 giving 21 as computed earlier. |
The DP ultimately picks the combination that yields 21.

---

## 7. Key Takeaway

> **Bound the useful consecutive laps, pre-compute cheapest stints, then DP over total laps.** This reduces an exponential search to linear time.
