# 1252. Cells with Odd Values in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/cells-with-odd-values-in-a-matrix](https://leetcode.com/problems/cells-with-odd-values-in-a-matrix)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given an `m × n` matrix initialized to 0 and a list of `indices` where each `[r, c]` increments all cells in row `r` and column `c`, return the number of cells with **odd** values after applying all increments.

---

## 2. Examples

**Example 1:**
```
Input: m = 2, n = 3, indices = [[0,1],[1,1]]
Output: 6
Explanation:
Initial matrix = [[0,0,0],[0,0,0]]
After [0,1]: [[1,1,1],[0,1,0]]
After [1,1]: [[1,2,1],[1,2,1]]
All 6 cells are odd.
```

**Example 2:**
```
Input: m = 1, n = 1, indices = [[0,0]]
Output: 1
```

---

## 3. Approach: Count Row/Col Increments — O(m + n + |indices|) ✅

```text
FUNCTION oddCells(m, n, indices):
    rowCount ← [0] * m
    colCount ← [0] * n
    FOR each (r, c) IN indices:
        rowCount[r] ← rowCount[r] + 1
        colCount[c] ← colCount[c] + 1
    
    oddRows ← COUNT of values in rowCount where value % 2 == 1
    oddCols ← COUNT of values in colCount where value % 2 == 1
    RETURN oddRows * (n - oddCols) + oddCols * (m - oddRows)
```

---

## 4. Walkthrough

| Step | rowCount | colCount | oddRows | oddCols | Result |
|------|----------|----------|---------|---------|--------|
| Init | [0,0]    | [0,0,0]  | 0       | 0       | – |
| After [0,1] | [1,0] | [0,1,0] | 1 | 1 | – |
| After [1,1] | [1,1] | [0,2,0] | 2 | 0 | 2*(3-0)+0*(2-2)=6 |

---

## 5. Complexity Analysis

- **Time:** O(m + n + k) where k = number of indices.
- **Space:** O(m + n) for the row and column counters.

---

## 6. Follow-Up Questions

- How would you modify the solution if the matrix were too large to store row/col counters in memory?
- Can you extend the approach to support decrement operations?

---

## Key Takeaway

> Don't simulate the matrix. A cell is odd when exactly one of its row or column increment counts is odd. Count odd rows and odd columns, then combine.
