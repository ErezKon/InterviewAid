# 885. Spiral Matrix III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-iii](https://leetcode.com/problems/spiral-matrix-iii)
**Companies:** Amazon, Apple, Bloomberg, Dataminr, Google, Meta, Microsoft, Uber

---

## Problem Description
You start at the cell `(rStart, cStart)` of an `rows x cols` grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all `rows * cols` spaces of the grid.

Return *an array of coordinates representing the positions of the grid in the order you visited them*.

**Constraints:**
- `1 <= rows, cols <= 100`
- `0 <= rStart < rows`
- `0 <= cStart < cols`

## Examples
```
Example 1:
  Input: rows = 1, cols = 4, rStart = 0, cStart = 0
  Output: [[0,0],[0,1],[0,2],[0,3]]
```

```
Example 2:
  Input: rows = 5, cols = 6, rStart = 1, cStart = 4
  Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
```

## Approach
Simulate the spiral by repeatedly moving in the current direction for a given number of steps, increasing the step count after every two direction changes. Record coordinates that lie inside the grid.

```text
FUNCTION spiralMatrixIII(rows, cols, rStart, cStart):
    SET result ← [[rStart, cStart]]
    SET directions ← [(0,1), (1,0), (0,-1), (-1,0)]  // right, down, left, up
    SET steps ← 1
    SET d ← 0
    SET r ← rStart
    SET c ← cStart
    WHILE LENGTH(result) < rows * cols:
        FOR repeat ← 1 TO 2:  // each step count used twice
            FOR i ← 1 TO steps:
                SET r ← r + directions[d][0]
                SET c ← c + directions[d][1]
                IF 0 ≤ r < rows AND 0 ≤ c < cols:
                    APPEND [r, c] TO result
            SET d ← (d + 1) MOD 4
        SET steps ← steps + 1
    RETURN result
```

## Walkthrough
Starting at `(1,4)` in a `5×6` grid:
| Move | Direction | Steps | New Cells Inside Grid |
|------|-----------|-------|-----------------------|
| 1 | right | 1 | `[1,5]` |
| 2 | down | 1 | `[2,5]` |
| 3 | left | 2 | `[2,4]`, `[2,3]` |
| 4 | up | 2 | `[1,3]`, `[0,3]` |
The process continues, expanding the step count each cycle.

## Complexity Analysis
- **Time:** Each cell is added once → `O(rows·cols)`.
- **Space:** Output list stores all coordinates → `O(rows·cols)` auxiliary space.

## Follow-Up Questions
1. How would you modify the algorithm to start from the center of the grid?
2. Can the spiral be generated in-place without storing all coordinates?
3. What changes are needed to produce a counter-clockwise spiral?

## Key Takeaway
By iterating over directions with an increasing step count and recording only in-bounds positions, we can efficiently generate the outward spiral traversal of a matrix.
