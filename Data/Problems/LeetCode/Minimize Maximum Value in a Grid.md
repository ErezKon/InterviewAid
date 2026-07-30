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

Given an `m × n` grid of **distinct** positive integers, replace each value with a positive integer such that the **relative order** within each row and each column is preserved, and the **maximum value** in the grid is minimized.

---

## Examples

**Example 1:**
```
Input: grid = [[1,3],[2,4]]
Output: [[1,2],[2,3]]
Explanation: The relative order in each row and column is kept. The maximum value is 3, which is the minimum possible.
```

**Example 2:**
```
Input: grid = [[5,1,3],[2,4,6]]
Output: [[3,1,2],[2,3,4]]
Explanation: After re‑assigning, each row and column remains sorted and the largest value is 4.
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