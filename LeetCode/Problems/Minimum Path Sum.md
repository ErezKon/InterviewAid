# 64. Minimum Path Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/minimum-path-sum](https://leetcode.com/problems/minimum-path-sum)
**Companies:** Amazon, Bloomberg, General Motors, Goldman Sachs, Google, Meta, Microsoft, Nvidia, Palo Alto Networks, Snapchat, Spacex, Squarepoint Capital, Texas Instruments, Tiktok, Uber, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(m·n)](#4-approach-dp--omn)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `m x n` grid filled with non-negative numbers, find a path from top-left to bottom-right that **minimizes** the sum of numbers along the path. You can only move **right** or **down**.

**Constraints:**
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 200`

---

## 2. Examples

```
Example 1:
  Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
  Output: 7
  Explanation: Path 1→3→1→1→1 = 7 (right, right, down, down)
               Or: 1→1→4→2→1 = 9 (down, down, right, right)
               Optimal: 1→1→5→1→1 = ... Actually 1→3→1→1→1 = 7 ✅

Example 2:
  Input: grid = [[1,2,3],[4,5,6]]
  Output: 12
  Explanation: 1→2→3→6 = 12
```

---

## 3. Key Insight

> Each cell can only be reached from the cell **above** or the cell to the **left**. So `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`. We can modify the grid in-place for O(1) extra space.

---

## 4. Approach: DP — O(m·n) ✅

```
FUNCTION minPathSum(grid):
    m, n = dimensions

    // Fill first row (can only come from left)
    FOR j ← 1 TO n-1:
        grid[0][j] += grid[0][j-1]

    // Fill first column (can only come from above)
    FOR i ← 1 TO m-1:
        grid[i][0] += grid[i-1][0]

    // Fill rest
    FOR i ← 1 TO m-1:
        FOR j ← 1 TO n-1:
            grid[i][j] += MIN(grid[i-1][j], grid[i][j-1])

    RETURN grid[m-1][n-1]
```

---

## 5. Walkthrough

```
grid = [[1,3,1],
        [1,5,1],
        [4,2,1]]

After first row:  [[1, 4, 5], ...]
After first col:  [[1, 4, 5], [2, 5, 1], [6, 2, 1]]

Fill rest:
  (1,1): 5 + min(4, 2) = 7
  (1,2): 1 + min(5, 7) = 6
  (2,1): 2 + min(7, 6) = 8
  (2,2): 1 + min(6, 8) = 7

Final grid:
  [[1, 4, 5],
   [2, 7, 6],
   [6, 8, 7]]

Answer = grid[2][2] = 7 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) — visit each cell once |
| **Space** | O(1) in-place modification |

---

## 7. Follow-Up Questions

**Q1: What if we can't modify the grid?**
Use a 1D DP array of size `n`, updating left-to-right per row. Space = O(n).

**Q2: What if we can move in all 4 directions?**
Then it's a general shortest path problem — use Dijkstra with a min-heap. Grid DP no longer works because of cycles.

**Q3: What if some cells are obstacles?**
Set obstacle cells to infinity. If `dp[m-1][n-1] == infinity`, no path exists.

---

## 8. Key Takeaway

> Standard grid DP with min instead of sum. Can modify the grid in-place for O(1) space. Generalizes to weighted shortest path in a DAG.
