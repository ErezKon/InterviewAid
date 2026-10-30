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

There are some robots and factories on the X-axis. You are given an integer array `robot` where `robot[i]` is the position of the `i^th` robot. You are also given a 2D integer array `factory` where `factory[j] = [position_j, limit_j]` indicates that `position_j` is the position of the `j^th` factory and that the `j^th` factory can repair at most `limit_j` robots.

The positions of each robot are **unique**. The positions of each factory are also **unique**. Note that a robot can be **in the same position** as a factory initially.

All the robots are initially broken; they keep moving in one direction. The direction could be the negative or the positive direction of the X-axis. When a robot reaches a factory that did not reach its limit, the factory repairs the robot, and it stops moving.

**At any moment**, you can set the initial direction of moving for **some** robot. Your target is to minimize the total distance traveled by all the robots.

Return *the minimum total distance traveled by all the robots*. The test cases are generated such that all the robots can be repaired.

**Note that**

- All robots move at the same speed.
- If two robots move in the same direction, they will never collide.
- If two robots move in opposite directions and they meet at some point, they do not collide. They cross each other.
- If a robot passes by a factory that reached its limits, it crosses it as if it does not exist.
- If the robot moved from a position `x` to a position `y`, the distance it moved is `|y - x|`.

**Constraints:**
- `1 <= robot.length, factory.length <= 100`
- `factory[j].length == 2`
- `-10^9 <= robot[i], position_j <= 10^9`
- `0 <= limit_j <= robot.length`
- The input will be generated such that it is always possible to repair every robot.

---

## 2. Examples

**Example 1:**
```
Input: robot = [0,4,6], factory = [[2,2],[6,2]]
Output: 4
Explanation: As shown in the figure:
- The first robot at position 0 moves in the positive direction. It will be repaired at the first factory.
- The second robot at position 4 moves in the negative direction. It will be repaired at the first factory.
- The third robot at position 6 will be repaired at the second factory. It does not need to move.
The limit of the first factory is 2, and it fixed 2 robots.
The limit of the second factory is 2, and it fixed 1 robot.
The total distance is |2 - 0| + |2 - 4| + |6 - 6| = 4. It can be shown that we cannot achieve a better total distance than 4.
```

**Example 2:**
```
Input: robot = [1,-1], factory = [[-2,1],[2,1]]
Output: 2
Explanation: As shown in the figure:
- The first robot at position 1 moves in the positive direction. It will be repaired at the second factory.
- The second robot at position -1 moves in the negative direction. It will be repaired at the first factory.
The limit of the first factory is 1, and it fixed 1 robot.
The limit of the second factory is 1, and it fixed 1 robot.
The total distance is |2 - 1| + |(-2) - (-1)| = 2. It can be shown that we cannot achieve a better total distance than 2.
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
