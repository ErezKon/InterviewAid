# 2371. Minimize Maximum Value in a Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-maximum-value-in-a-grid](https://leetcode.com/problems/minimize-maximum-value-in-a-grid)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an `m x n` integer matrix `grid` containing **distinct** positive integers.

You have to replace each integer in the matrix with a positive integer satisfying the following conditions:

- The **relative** order of every two elements that are in the same row or column should stay the **same** after the replacements.
- The **maximum** number in the matrix after the replacements should be as **small** as possible.

The relative order stays the same if for all pairs of elements in the original matrix such that `grid[r1][c1] > grid[r2][c2]` where either `r1 == r2` or `c1 == c2`, then it must be true that `grid[r1][c1] > grid[r2][c2]` after the replacements.

For example, if `grid = [[2, 4, 5], [7, 3, 9]]` then a good replacement could be either `grid = [[1, 2, 3], [2, 1, 4]]` or `grid = [[1, 2, 3], [3, 1, 4]]`.

Return *the **resulting** matrix.* If there are multiple answers, return **any** of them.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 ≤ m, n ≤ 1000`
- `1 ≤ m * n ≤ 10⁵`
- `1 ≤ grid[i][j] ≤ 10⁹`
- `grid` consists of distinct integers.

---

## Examples

```
Example 1:
  Input: grid = [[3,1],[2,5]]
  Output: [[2,1],[1,2]]
  Explanation: The output is a valid replacement.
  The maximum number in the matrix is 2. It can be shown that no smaller value can be obtained.
```

```
Example 2:
  Input: grid = [[10]]
  Output: [[1]]
  Explanation: We replace the only number in the matrix with 1.
```

---

## Approach

**Algorithm:** Sort + Row/Column Tracking (Greedy)

The cells are processed in increasing order of their original values. For each cell, the smallest assignable rank that is larger than any rank already placed in its row or column is chosen. This ensures the ordering constraints while keeping the overall maximum as low as possible.

```text
FUNCTION MinimizeMaximum(grid):
    m, n ← dimensions of grid
    cells ← [(grid[r][c], r, c) FOR ALL r, c]
    SORT cells BY value ASCENDING
    
    rowMax ← ARRAY(m, 0)   // highest assigned rank in each row
    colMax ← ARRAY(n, 0)   // highest assigned rank in each column
    result ← MATRIX(m, n)
    
    FOR (val, r, c) IN cells DO
        assign ← MAX(rowMax[r], colMax[c]) + 1
        result[r][c] ← assign
        rowMax[r] ← assign
        colMax[c] ← assign
    
    RETURN result
```

---

## Walkthrough

Consider **Example 1** `[[1,3],[2,4]]`.

| Step | Cell (value, r, c) | rowMax before | colMax before | assign | rowMax after | colMax after |
|------|--------------------|---------------|---------------|--------|--------------|--------------|
| 1    | (1,0,0)            | [0,0]         | [0,0]         | 1      | [1,0]        | [1,0]        |
| 2    | (2,1,0)            | [1,0]         | [1,0]         | 2      | [1,2]        | [1,0]        |
| 3    | (3,0,1)            | [1,2]         | [1,0]         | 2      | [2,2]        | [1,2]        |
| 4    | (4,1,1)            | [2,2]         | [1,2]         | 3      | [2,3]        | [1,3]        |

The final grid `[[1,2],[2,3]]` has maximum 3.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + greedy assign | **O(m·n log(m·n))** | **O(m·n)** |

---

## Follow-Up Questions

1. How would the solution change if duplicate values were allowed in the original grid?
2. Can the algorithm be adapted to minimize the **sum** of all values instead of the maximum?
3. What if the ordering constraint applied only to rows (or only to columns)?

---

## Key Takeaway

> **Coordinate compression with constraints** — process cells in value order, assigning the smallest valid rank that respects row and column ordering. Track maximums per row and column.

---