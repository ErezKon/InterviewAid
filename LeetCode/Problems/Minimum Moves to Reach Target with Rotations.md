# 1210. Minimum Moves to Reach Target with Rotations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations](https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations)
**Companies:** Kakao

---

## Problem Description

A snake occupies 2 cells on an n×n grid (horizontal or vertical). It can move right, down, or rotate (clockwise/counterclockwise). Return **minimum moves** to reach the target position.

## Examples

| Grid | Start | Target | Output | Explanation |
|------|-------|--------|--------|-------------|
| `[[0,0,0,0,0],[0,1,0,0,0],[0,1,0,0,1],[0,0,0,0,1],[0,0,0,0,0]]` | (0,0,h) | (4,3,h) | 7 | The snake moves right, down, rotates, etc., reaching the target in 7 moves. |
| `[[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0]]` | (0,0,h) | (4,3,h) | -1 | Obstacles block any possible path, so the target is unreachable.

## Approach

**Algorithm:** Breadth‑First Search (BFS) on a state space that includes the snake’s head position and its orientation (horizontal = 0, vertical = 1).

**Key Insight:** The snake’s movement depends on both cells it occupies, so the state must capture orientation. Rotations are only allowed when the 2×2 block around the head is free.

```text
FUNCTION minimumMoves(grid):
    n ← LENGTH(grid)
    start ← (0, 0, 0)               // row, col of head, orientation
    target ← (n-1, n-2, 0)
    queue ← [(start, 0)]            // (state, moves)
    visited ← {start}
    WHILE queue NOT EMPTY:
        (r, c, orient), moves ← queue.DEQUEUE()
        IF (r, c, orient) == target: RETURN moves
        // generate possible moves
        FOR each (nr, nc, nOrient) in validNextStates(r, c, orient, grid):
            IF (nr, nc, nOrient) NOT IN visited:
                visited.ADD((nr, nc, nOrient))
                queue.ENQUEUE(((nr, nc, nOrient), moves + 1))
    RETURN -1
```

## Walkthrough

Consider the first example grid. The snake starts at `(0,0)` horizontal.
1. **Move Right** → head at `(0,1)`. Both cells `(0,0)` and `(0,1)` are free.
2. **Move Right** → head at `(0,2)`.
3. **Move Down** → head at `(1,2)`, orientation stays horizontal.
4. **Rotate Clockwise** → now vertical with head at `(1,2)`. The 2×2 block `(0,1)-(1,2)` is free, allowing rotation.
5. Continue exploring moves; BFS guarantees the first time we reach `(4,3)` horizontal is with 7 moves.

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n²) – each cell with two orientations is visited at most once. |
| Space  | O(n²) – queue and visited set store states for each cell/orientation. |

## Follow‑Up Questions

1. How would the solution change if the snake length were greater than 2?
2. Could a heuristic (A*) improve performance on very large grids?
3. What modifications are needed if diagonal moves were allowed?

## Key Takeaway

> Multi‑cell movement on grids → BFS with state including **position + orientation**. Rotation constraints require checking a 2×2 area for obstacles.