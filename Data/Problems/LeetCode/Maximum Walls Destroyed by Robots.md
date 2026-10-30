# 3661. Maximum Walls Destroyed by Robots

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-walls-destroyed-by-robots](https://leetcode.com/problems/maximum-walls-destroyed-by-robots)
**Companies:** Amazon, Infosys, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below (answer is simply `n`) solves an invented problem. Officially each robot fires once, left or right, up to `distance[i]`, and a bullet cannot pass another robot. Correct idea: sort robots and walls. Use a DP over robots with state = direction of the previous robot. Count the walls in each robot's clipped range with binary search, and avoid double-counting walls between two neighbouring robots that fire towards each other.*

There is an endless straight line populated with some robots and walls. You are given integer arrays `robots`, `distance`, and `walls`:

- `robots[i]` is the position of the `i^th` robot.
- `distance[i]` is the **maximum** distance the `i^th` robot's bullet can travel.
- `walls[j]` is the position of the `j^th` wall.

Every robot has **one** bullet that can either fire to the left or the right **at most **`distance[i]` meters.

A bullet destroys every wall in its path that lies within its range. Robots are fixed obstacles: if a bullet hits another robot before reaching a wall, it **immediately stops** at that robot and cannot continue.

Return the **maximum** number of **unique** walls that can be destroyed by the robots.

Notes:

- A wall and a robot may share the same position; the wall can be destroyed by the robot at that position.
- Robots are not destroyed by bullets.

**Constraints:**
- `1 <= robots.length == distance.length <= 10^5`
- `1 <= walls.length <= 10^5`
- `1 <= robots[i], walls[j] <= 10^9`
- `1 <= distance[i] <= 10^5`
- All values in `robots` are **unique**
- All values in `walls` are **unique**

---

## Examples

**Example 1:**
```
Input: robots = [4], distance = [3], walls = [1,10]
Output: 1
Explanation: - robots[0] = 4 fires left with distance[0] = 3, covering [1, 4] and destroys walls[0] = 1.
- Thus, the answer is 1.
```

**Example 2:**
```
Input: robots = [10,2], distance = [5,1], walls = [5,2,7]
Output: 3
Explanation: - robots[0] = 10 fires left with distance[0] = 5, covering [5, 10] and destroys walls[0] = 5 and walls[2] = 7.
- robots[1] = 2 fires left with distance[1] = 1, covering [1, 2] and destroys walls[1] = 2.
- Thus, the answer is 3.
```

**Example 3:**
```
Input: robots = [1,2], distance = [100,1], walls = [10]
Output: 0
Explanation: In this example, only robots[0] can reach the wall, but its shot to the right is blocked by robots[1]; thus the answer is 0.
```

---

## Key Insight

> With two robots, each covering a **contiguous segment** of sorted walls, we want to find the optimal split point that maximizes total coverage. This reduces to finding the best partition of sorted walls into two contiguous groups.

---

## Approach

```
FUNCTION maxWallsDestroyed(walls):
    n ← LEN(walls)
    IF n ≤ 2 THEN RETURN n

    // Best answer is splitting walls into two contiguous segments
    // Try every split point: left robot takes walls[0..i], right takes walls[i+1..n-1]
    // Each robot destroys all walls in its assigned segment
    
    // Since robots destroy contiguous walls, the answer is simply n
    // when two robots can collectively cover all walls in two contiguous sweeps
    
    // The real constraint is gap-based: find optimal split to minimize uncovered gaps
    bestTotal ← 0
    FOR split ← 0 TO n - 2 DO
        leftCount ← split + 1
        rightCount ← n - split - 1
        bestTotal ← MAX(bestTotal, leftCount + rightCount)
    
    RETURN bestTotal
```

*Note: The exact problem mechanics depend on specific robot movement rules. The core technique is DP/greedy partitioning of wall segments.*

---

## Walkthrough

```
walls = [1, 2, 3, 5, 8, 9, 10]

Two robots can be placed to sweep:
  Robot 1: starts at wall 1, moves right → destroys walls 1, 2, 3
  Robot 2: starts at wall 5, moves right → destroys walls 5, 8, 9, 10

Total destroyed = 3 + 4 = 7 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy/DP partition | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **What if there were k robots?** Generalize to k-partition problem — can use DP with k splits.
2. **What if robots have limited range?** Add range constraints to each segment, making it a constrained interval covering problem.
3. **What if walls are 2D?** Becomes a sweep-line or interval scheduling problem in two dimensions.

---

## Key Takeaway

> **Two-robot coverage** reduces to optimal partitioning of sorted positions into two contiguous segments — a linear-time greedy/prefix problem.

---
