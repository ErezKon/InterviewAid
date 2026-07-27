# 1210. Minimum Moves to Reach Target with Rotations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations](https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations)
**Companies:** Kakao

---

## Problem Description

A snake occupies 2 cells on an n×n grid (horizontal or vertical). It can move right, down, or rotate (clockwise/counterclockwise). Return **minimum moves** to reach the target position.

## Key Insight

> BFS with state `(row, col, orientation)` where orientation = horizontal/vertical. The snake's head defines the position. Rotation requires a 2×2 free area.

## Approach: BFS — O(n²) ✅

```
FUNCTION minimumMoves(grid):
    // State: (row, col, horizontal?)
    // Start: (0, 0, horizontal), Target: (n-1, n-2, horizontal)
    queue ← [(0, 0, 0, 0)]   // (r, c, orient, moves)
    visited ← {(0, 0, 0)}

    WHILE queue:
        (r, c, orient, moves) ← queue.DEQUEUE()
        IF (r, c, orient) == target: RETURN moves
        // Try: move right, move down, rotate CW, rotate CCW
        // Check grid bounds and obstacles for each move
        FOR each valid next state:
            IF not visited: enqueue

    RETURN -1
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

## Key Takeaway

> Multi-cell movement on grids → BFS with state including **position + orientation**. Rotation constraints require checking a 2×2 area for obstacles.
