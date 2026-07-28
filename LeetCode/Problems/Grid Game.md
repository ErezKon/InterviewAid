# 2017. Grid Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grid-game](https://leetcode.com/problems/grid-game)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix Sums — O(n) ✅](#3-approach-prefix-sums--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

A 2×n grid. Robot 1 moves first (top-left to bottom-right), zeroing cells it visits. Robot 2 then moves the same way, collecting points. Robot 1 wants to minimize Robot 2's score; Robot 2 maximizes.

---

## 2. Key Insight

> Robot 1 must go down at exactly one column. After Robot 1 descends at column `i`, Robot 2 can only collect from the top-right or bottom-left portions. Robot 2 picks the better one → minimize that max.

---

## 3. Approach: Prefix Sums — O(n) ✅

```text
FUNCTION gridGame(grid):
    topSum ← SUM(grid[0])
    botSum ← 0
    result ← INFINITY

    FOR i ← 0 TO n - 1:
        topSum ← topSum - grid[0][i]
        result ← MIN(result, MAX(topSum, botSum))
        botSum ← botSum + grid[1][i]

    RETURN result
```

---

## 4. Examples

**Example 1:**
```
grid = [[2,5,4],[1,5,1]]
Output: 3
```
*Robot 1 descends after column 0, leaving top suffix = 9, bottom prefix = 1 → max = 9. Best split gives max = 3.*

**Example 2:**
```
grid = [[1,3,1],[1,5,1]]
Output: 4
```
*Optimal split after column 1 yields top suffix = 1, bottom prefix = 2 → max = 2, but Robot 1 must consider both sides, final answer 4.*

---

## 5. Walkthrough

| Step | i (split column) | top suffix sum | bottom prefix sum | max | result |
|------|------------------|----------------|-------------------|-----|--------|
| 0    | 0                | 9 (5+4)        | 0                 | 9   | 9      |
| 1    | 1                | 4 (4)          | 1                 | 4   | 4      |
| 2    | 2                | 0              | 2 (1+1)           | 2   | 2      |

Minimum of the max values is **2**, which is the answer.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass to compute prefix sums.
- **Space:** O(1) – only a few scalar variables.

---

## 7. Follow-Up Questions

1. How would the solution change if the grid had more than two rows?
2. What if Robot 1 could make multiple downward moves?
3. Can the problem be extended to weighted edges between cells?

---

## 8. Key Takeaway

> Robot 1 chooses the split column. Robot 2's score = max(top suffix, bottom prefix). Minimize over all split points.
