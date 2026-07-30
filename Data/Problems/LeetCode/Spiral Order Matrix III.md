# 885. Spiral Matrix III

**Difficulty:** 🟡 Medium
**Acceptance:** 78.0%
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-iii](https://leetcode.com/problems/spiral-matrix-iii)
**Companies:** Amazon, Apple, Bloomberg, Dataminr, Google, Meta, Microsoft, Uber

---

## 1. Problem Description

Starting from `(rStart, cStart)` in an R×C grid, walk in a clockwise spiral. Return coordinates of all cells in the order visited.

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

## Follow‑Up Questions

- How would you modify the algorithm to start the spiral in a counter‑clockwise direction?
- Can you generate the order without storing all coordinates (streaming output)?
- How would you adapt the solution for a toroidal grid where moving off one edge wraps around?

---

## Key Takeaway

> Spiral: go right 1, down 1, left 2, up 2, right 3, down 3, left 4, ... Step count increases by 1 after every two direction changes.