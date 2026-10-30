# 1252. Cells with Odd Values in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/cells-with-odd-values-in-a-matrix](https://leetcode.com/problems/cells-with-odd-values-in-a-matrix)
**Companies:** Google, Microsoft

---

## 1. Problem Description

There is an `m x n` matrix that is initialized to all `0`'s. There is also a 2D array `indices` where each `indices[i] = [r_i, c_i]` represents a **0-indexed location** to perform some increment operations on the matrix.

For each location `indices[i]`, do **both** of the following:

1. Increment **all** the cells on row `r_i`.
2. Increment **all** the cells on column `c_i`.

Given `m`, `n`, and `indices`, return *the **number of odd-valued cells** in the matrix after applying the increment to all locations in* `indices`.

**Constraints:**
- `1 <= m, n <= 50`
- `1 <= indices.length <= 100`
- `0 <= r_i < m`
- `0 <= c_i < n`

**Follow up:** Could you solve this in `O(n + m + indices.length)` time with only `O(n + m)` extra space?

---

## 2. Examples

```
Example 1:
  Input: m = 2, n = 3, indices = [[0,1],[1,1]]
  Output: 6
  Explanation: Initial matrix = [[0,0,0],[0,0,0]].
  After applying first increment it becomes [[1,2,1],[0,1,0]].
  The final matrix is [[1,3,1],[1,3,1]], which contains 6 odd numbers.
```

```
Example 2:
  Input: m = 2, n = 2, indices = [[1,1],[0,0]]
  Output: 0
  Explanation: Final matrix = [[2,2],[2,2]]. There are no odd numbers in the final matrix.
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
