# 2017. Grid Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grid-game](https://leetcode.com/problems/grid-game)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix Sums — O(n) ✅](#3-approach-prefix-sums--on-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

A 2×n grid. Robot 1 moves first (top-left to bottom-right), zeroing cells it visits. Robot 2 then moves the same way, collecting points. Robot 1 wants to minimize Robot 2's score; Robot 2 maximizes.

---

## 2. Key Insight

> Robot 1 must go down at exactly one column. After Robot 1 descends at column `i`, Robot 2 can only collect from the top-right or bottom-left portions. Robot 2 picks the better one → minimize that max.

---

## 3. Approach: Prefix Sums — O(n) ✅

```
FUNCTION gridGame(grid):
    topSum = SUM(grid[0]); botSum = 0
    result = infinity

    FOR i ← 0 TO n - 1:
        topSum -= grid[0][i]
        result = MIN(result, MAX(topSum, botSum))
        botSum += grid[1][i]

    RETURN result
```

---

## 4. Key Takeaway

> Robot 1 chooses the split column. Robot 2's score = max(top suffix, bottom prefix). Minimize over all split points.
