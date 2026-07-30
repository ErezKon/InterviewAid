# 3128. Right Triangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/right-triangles](https://leetcode.com/problems/right-triangles)
**Companies:** Google, Mitsogo

---

## Problem Description

Given an `m × n` binary grid, count the number of **right triangles** formed by 3 cells containing `1` where two cells share a row and two share a column (one cell is the right-angle vertex).

---

## Examples

**Example 1:**
```
Input: grid = [[1,0,1],[0,1,0],[1,0,1]]
Output: 4
Explanation: The four right triangles are formed with right-angle vertices at the four corner cells containing 1.
```

**Example 2:**
```
Input: grid = [[1,1,0],[1,0,1],[0,1,1]]
Output: 6
Explanation: Each 1 that has at least one other 1 in its row and column contributes to multiple triangles.
```

---

## Key Insight

> For each cell `(i,j)` with value 1, it can be the right-angle vertex. Count = `(rowCount[i] - 1) * (colCount[j] - 1)` — choose one other 1 in the same row and one other 1 in the same column.

---

## Approach

```text
FUNCTION numberOfRightTriangles(grid):
    m, n ← dimensions of grid
    rowCount ← ARRAY of size m initialized to 0
    colCount ← ARRAY of size n initialized to 0
    // Count 1s per row and column
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO n-1:
            IF grid[i][j] == 1:
                rowCount[i] ← rowCount[i] + 1
                colCount[j] ← colCount[j] + 1
    total ← 0
    // Each 1 can be the right-angle vertex
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO n-1:
            IF grid[i][j] == 1:
                total ← total + (rowCount[i] - 1) * (colCount[j] - 1)
    RETURN total
```

---

## Walkthrough

Consider Example 1: `grid = [[1,0,1],[0,1,0],[1,0,1]]`

| Row | Row Count |
|-----|-----------|
| 0   | 2         |
| 1   | 1         |
| 2   | 2         |

| Column | Column Count |
|--------|--------------|
| 0      | 2            |
| 1      | 1            |
| 2      | 2            |

Now iterate each cell containing `1`:
- Cell (0,0): `(rowCount[0]-1)*(colCount[0]-1) = (2-1)*(2-1) = 1`
- Cell (0,2): `(2-1)*(2-1) = 1`
- Cell (1,1): `(1-1)*(1-1) = 0`
- Cell (2,0): `(2-1)*(2-1) = 1`
- Cell (2,2): `(2-1)*(2-1) = 1`
Sum = 4 triangles, matching the output.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(m·n) — precompute counts + iterate all cells |
| Space  | O(m + n) — row and column counts |

---

## Follow-Up Questions

1. How would you modify the algorithm to count only **isosceles** right triangles?
2. Can you extend the solution to count right triangles on a **torus** grid where edges wrap around?
3. What changes are needed if the grid contains **weights** and you need the maximum sum triangle?

---

## Key Takeaway

> For counting right triangles on a grid, the right-angle vertex determines the triangle — it contributes `(row_ones - 1) × (col_ones - 1)` triangles.
