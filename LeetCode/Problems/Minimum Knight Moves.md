# 1197. Minimum Knight Moves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-knight-moves](https://leetcode.com/problems/minimum-knight-moves)
**Companies:** Amazon, Apple, Bloomberg, Databricks, Google, Linkedin, Meta, Microsoft, Nvidia, Oracle, Uber, Verily, Waymo

---

## Problem Description

On an infinite chessboard, return the **minimum number of knight moves** to reach `(x, y)` from `(0, 0)`.

## Key Insight

> BFS from origin. Exploit **symmetry**: `abs(x), abs(y)` reduces to first quadrant. Bound search to `>= -1` to avoid exploring too far in negative direction while allowing necessary backward moves.

## Approach: BFS from (0,0) — O(|x|·|y|) ✅

```
FUNCTION minKnightMoves(x, y):
    x, y = abs(x), abs(y)    // exploit symmetry
    visited = {(0, 0)}
    queue = [(0, 0, 0)]

    WHILE queue:
        (cx, cy, steps) = queue.DEQUEUE()
        IF cx == x AND cy == y: RETURN steps

        FOR (dx, dy) IN knight_moves:
            nx, ny = cx + dx, cy + dy
            IF (nx, ny) NOT IN visited AND nx >= -1 AND ny >= -1:
                visited.ADD((nx, ny))
                queue.ENQUEUE((nx, ny, steps + 1))
```

| Time | Space |
|------|-------|
| O(max(x,y)²) | O(max(x,y)²) |

## Key Takeaway

> Knight moves on infinite board → BFS with symmetry reduction. Allow slight negative overshoot (`>= -1`) for cases like reaching (1,0) which requires going to (-1, -1) first.
