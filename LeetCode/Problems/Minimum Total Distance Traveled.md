# 2463. Minimum Total Distance Traveled

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-total-distance-traveled](https://leetcode.com/problems/minimum-total-distance-traveled)
**Companies:** Amazon, Bloomberg, Google, Infosys, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n·m)](#4-approach-dp--onm)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given robots on a number line and factories with repair limits, assign each robot to a factory. Distance = `|robot - factory|`. Return the **minimum** total distance.

**Constraints:**
- `1 <= robots.length, factories.length <= 100`
- Each factory has a capacity limit

---

## 2. Examples

```
Example 1:
  Input: robot = [0, 4, 6], factory = [[2, 2], [6, 2]]
  Output: 4
  Explanation: Robot 0→factory 2 (dist 2), Robot 4→factory 2 (dist 2), Robot 6→factory 6 (dist 0). Total=4.
```

---

## 3. Key Insight

> Sort both robots and factories. Expand factories into individual slots. Then **DP matching**: `dp[i][j]` = min distance assigning first `i` robots to first `j` slots. Each slot is either skipped or matched to the next unassigned robot.

---

## 4. Approach: DP — O(n·m) ✅

```
FUNCTION minimumTotalDistance(robot, factory):
    SORT robot; SORT factory
    // Expand factory into list of positions (each slot)
    slots = []
    FOR [pos, limit] IN factory:
        FOR _ ← 0 TO limit - 1: slots.ADD(pos)

    n, m = len(robot), len(slots)
    dp = (n+1) × (m+1) of infinity
    dp[0][j] = 0 for all j

    FOR j ← 1 TO m:
        FOR i ← 0 TO n:
            dp[i][j] = dp[i][j-1]    // skip slot j
            IF i > 0:
                dp[i][j] = MIN(dp[i][j], dp[i-1][j-1] + ABS(robot[i-1] - slots[j-1]))

    RETURN dp[n][m]
```

---

## 5. Walkthrough

```
robot = [0, 4, 6] (sorted), factory = [[2,2],[6,2]]
slots = [2, 2, 6, 6]

dp table fills matching robots to slots optimally:
  Robot 0 → slot 2 (dist 2)
  Robot 4 → slot 2 (dist 2)
  Robot 6 → slot 6 (dist 0)
  Total = 4 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m) where m = total factory capacity |
| **Space** | O(n · m) |

---

## 7. Key Takeaway

> **Expand factories into slots, then 2D DP matching.** Sorting ensures optimal assignments are non-crossing. The slot expansion simplifies capacity handling into a standard matching DP.
