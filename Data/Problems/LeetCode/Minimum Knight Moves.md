# 1197. Minimum Knight Moves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-knight-moves](https://leetcode.com/problems/minimum-knight-moves)
**Companies:** Amazon, Apple, Bloomberg, Databricks, Google, Linkedin, Meta, Microsoft, Nvidia, Oracle, Uber, Verily, Waymo

---

## Problem Description

On an infinite chessboard, return the **minimum number of knight moves** to reach `(x, y)` from `(0, 0)`.

## Examples

| x | y | Output |
|---|---|--------|
| 2 | 1 | 1 |
| 5 | 5 | 4 |
| -1 | -1 | 2 |

*Explanation*: For `(5,5)`, a shortest path is `(0,0) → (2,1) → (4,2) → (3,4) → (5,5)`.

## Approach

**Algorithm**: Breadth‑First Search (BFS) with symmetry reduction.

We exploit symmetry by converting `(x, y)` to `(abs(x), abs(y))`, limiting the search to the first quadrant. The BFS explores knight moves while keeping coordinates `≥ -1` to allow necessary back‑steps.

```text
FUNCTION minKnightMoves(x, y):
    SET x, y ← ABS(x), ABS(y)    // symmetry
    SET visited ← {(0, 0)}
    SET queue ← [(0, 0, 0)]       // (cx, cy, steps)
    WHILE queue NOT EMPTY:
        SET (cx, cy, steps) ← DEQUEUE(queue)
        IF cx == x AND cy == y:
            RETURN steps
        FOR (dx, dy) IN [(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)]:
            SET nx, ny ← cx + dx, cy + dy
            IF nx >= -1 AND ny >= -1 AND (nx, ny) NOT IN visited:
                ADD (nx, ny) TO visited
                ENQUEUE(queue, (nx, ny, steps + 1))
```

## Walkthrough

Example: `x = 2, y = 1`

| Step | Queue (cx,cy,steps) | Visited |
|------|----------------------|---------|
| 0 | [(0,0,0)] | {(0,0)} |
| 1 | [(1,2,1),(2,1,1),...] | add those |
| 2 | ... | ... |
| ... | reaches `(2,1)` at step 1 → return 1 |

## Complexity Analysis

- **Time**: O(max(|x|,|y|)²) – each reachable coordinate within the bounded region is visited once.
- **Space**: O(max(|x|,|y|)²) – storage for the visited set and queue.

## Follow‑Up Questions

1. How would the solution change if the board were finite with obstacles?
2. Can you devise a mathematical formula for the minimum moves without BFS?
3. What modifications are needed for a knight that moves in a different pattern (e.g., (3,0) and (0,3))?

## Key Takeaway

> Knight moves on an infinite board are efficiently solved with BFS combined with symmetry reduction, limiting the search space while still guaranteeing optimality.
