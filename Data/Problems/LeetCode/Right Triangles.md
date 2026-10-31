# 3128. Right Triangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/right-triangles](https://leetcode.com/problems/right-triangles)
**Companies:** Google, Mitsogo

---

## Problem Description

You are given a 2D boolean matrix `grid`.

A collection of 3 elements of `grid` is a **right triangle** if one of its elements is in the **same row** with another element and in the **same column** with the third element. The 3 elements may **not** be next to each other.

Return an integer that is the number of **right triangles** that can be made with 3 elements of `grid` such that **all** of them have a value of 1.

**Constraints:**
- `1 <= grid.length <= 1000`
- `1 <= grid[i].length <= 1000`
- `0 <= grid[i][j] <= 1`

---

## Examples

**Example 1:**
```
Input: grid = [[0,1,0],[0,1,1],[0,1,0]]
Output: 2
Explanation: There are two right triangles with elements of the value 1. Notice that the blue ones do not form a right triangle because the 3 elements are in the same column.
```

**Example 2:**
```
Input: grid = [[1,0,0,0],[0,1,0,1],[1,0,0,0]]
Output: 0
Explanation: There are no right triangles with elements of the value 1.  Notice that the blue ones do not form a right triangle.
```

**Example 3:**
```
Input: grid = [[1,0,1],[1,0,0],[1,0,0]]
Output: 2
Explanation: There are two right triangles with elements of the value 1.
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

Example 1: `grid = [[0,1,0],[0,1,1],[0,1,0]]`

| Row | Row Count |
|-----|-----------|
| 0   | 1         |
| 1   | 2         |
| 2   | 1         |

| Column | Column Count |
|--------|--------------|
| 0      | 0            |
| 1      | 3            |
| 2      | 1            |

Now iterate each cell containing `1`:
- Cell (0,1): `(rowCount[0]-1)*(colCount[1]-1) = (1-1)*(3-1) = 0`
- Cell (1,1): `(2-1)*(3-1) = 2`
- Cell (1,2): `(2-1)*(1-1) = 0`
- Cell (2,1): `(1-1)*(3-1) = 0`
Sum = 2 triangles, matching the expected output (vertex (1,1) with (1,2) and either (0,1) or (2,1)).

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
