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

You are given a **0-indexed** 2D array `grid` of size `2 x n`, where `grid[r][c]` represents the number of points at position `(r, c)` on the matrix. Two robots are playing a game on this matrix.

Both robots initially start at `(0, 0)` and want to reach `(1, n-1)`. Each robot may only move to the **right** (`(r, c)` to `(r, c + 1)`) or **down** (`(r, c)` to `(r + 1, c)`).

At the start of the game, the **first** robot moves from `(0, 0)` to `(1, n-1)`, collecting all the points from the cells on its path. For all cells `(r, c)` traversed on the path, `grid[r][c]` is set to `0`. Then, the **second** robot moves from `(0, 0)` to `(1, n-1)`, collecting the points on its path. Note that their paths may intersect with one another.

The **first** robot wants to **minimize** the number of points collected by the **second** robot. In contrast, the **second** robot wants to **maximize** the number of points it collects. If both robots play **optimally**, return *the **number of points** collected by the **second** robot.*

**Constraints:**
- `grid.length == 2`
- `n == grid[r].length`
- `1 <= n <= 5 * 10^4`
- `1 <= grid[r][c] <= 10^5`

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

```
Example 1:
  Input: grid = [[2,5,4],[1,5,1]]
  Output: 4
  Explanation: The first robot goes right to column 1, then down (path: (0,0),(0,1),(1,1),(1,2)).
  The cells visited by the first robot are set to 0.
  The second robot will collect 0 + 0 + 4 + 0 = 4 points.
```
```
Example 2:
  Input: grid = [[3,3,1],[8,5,2]]
  Output: 4
  Explanation: The first robot goes down at column 0 (path: (0,0),(1,0),(1,1),(1,2)).
  The cells visited by the first robot are set to 0.
  The second robot will collect 0 + 3 + 1 + 0 = 4 points.
```
```
Example 3:
  Input: grid = [[1,3,1,15],[1,3,3,1]]
  Output: 7
  Explanation: The first robot goes right to column 3, then down (path: (0,0),(0,1),(0,2),(0,3),(1,3)).
  The cells visited by the first robot are set to 0.
  The second robot will collect 0 + 1 + 3 + 3 + 0 = 7 points.
```

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
