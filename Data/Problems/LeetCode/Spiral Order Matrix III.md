# 885. Spiral Matrix III

**Difficulty:** 🟡 Medium
**Acceptance:** 78.0%
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-iii](https://leetcode.com/problems/spiral-matrix-iii)
**Companies:** Amazon, Apple, Bloomberg, Dataminr, Google, Meta, Microsoft, Uber

---

## 1. Problem Description

> *Note: duplicate of [Spiral Matrix III.md](Spiral%20Matrix%20III.md) (#885).*

You start at the cell `(rStart, cStart)` of an `rows x cols` grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all `rows * cols` spaces of the grid.

Return *an array of coordinates representing the positions of the grid in the order you visited them*.

**Constraints:**
- `1 <= rows, cols <= 100`
- `0 <= rStart < rows`
- `0 <= cStart < cols`

**Examples:**

**Example 1:**
```
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]
```

**Example 2:**
```
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
```

---

## 2. Approach: Spiral Walk with Increasing Steps — O(max(R,C)²) ✅

```text
FUNCTION spiralMatrixIII(rows, cols, rStart, cStart):
    result = [(rStart, cStart)]
    directions = [(0,1), (1,0), (0,-1), (-1,0)] // right, down, left, up
    steps = 1
    WHILE LENGTH(result) < rows * cols:
        FOR d ← 0 TO 3:
            FOR s ← 0 TO steps - 1:
                rStart += directions[d][0]
                cStart += directions[d][1]
                IF 0 <= rStart < rows AND 0 <= cStart < cols:
                    APPEND result WITH (rStart, cStart)
            IF d == 0 OR d == 2:
                steps ← steps + 1
    RETURN result
```

---

## Examples

| Input (rows, cols, rStart, cStart) | Output (first few coordinates) |
|------------------------------------|--------------------------------|
| `1, 4, 0, 0` | `[(0,0),(0,1),(0,2),(0,3)]` |
| `5, 6, 1, 4` | `[(1,4),(1,5),(2,5),(2,4),(2,3),...]` |

## Walkthrough

1. **Initialize** – start at `(rStart,cStart)` and add to result.
2. **Direction cycle** – move right 1 step, then down 1, left 2, up 2, right 3, down 3, …
3. **Step increment** – after completing a right or left move, increase `steps` by 1.
4. **Boundary check** – only append coordinates that lie inside the `rows × cols` grid.
5. Continue until `rows*cols` coordinates are collected.

## Complexity Analysis

- **Time:** O(max(R, C)²) – each step moves at most one cell and the spiral expands until the grid is covered.
- **Space:** O(R·C) for the output list; auxiliary space O(1).

## Follow-Up Questions

- How would you modify the algorithm to start the spiral in a counter-clockwise direction?
- Can you generate the order without storing all coordinates (streaming output)?
- How would you adapt the solution for a toroidal grid where moving off one edge wraps around?

---

## Key Takeaway

> Spiral: go right 1, down 1, left 2, up 2, right 3, down 3, left 4, ... Step count increases by 1 after every two direction changes.