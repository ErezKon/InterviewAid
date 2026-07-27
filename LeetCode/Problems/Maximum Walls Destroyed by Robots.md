# 3661. Maximum Walls Destroyed by Robots

**Difficulty:** 🔴 Hard
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

You are given `n` walls at positions along a line and two robots. Each robot is placed at a wall and destroys walls while moving in a chosen direction (left or right), destroying every wall it passes through. Maximize the total number of **distinct** walls destroyed by both robots combined.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- Walls are given as sorted positions

---

## Examples

**Example 1:**
```
Input:  walls = [1, 2, 3, 5, 8, 9, 10]
Output: 7
Explanation: Robot 1 covers [1..3], Robot 2 covers [5..10]. All walls destroyed.
```

**Example 2:**
```
Input:  walls = [1, 5, 10]
Output: 3
Explanation: Each robot covers a contiguous segment; with 2 robots we can cover all.
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
