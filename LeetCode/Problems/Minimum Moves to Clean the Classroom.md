# 3568. Minimum Moves to Clean the Classroom

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-clean-the-classroom](https://leetcode.com/problems/minimum-moves-to-clean-the-classroom)
**Companies:** Bloomberg

---

## Problem Description

Navigate a grid classroom, collecting all litter pieces with minimum moves. Return the minimum total moves.

## Examples

**Example 1:**
```
Input: classroom = [[0,1,0],[0,0,2],[0,0,0]]
Output: 5
Explanation: Starting at (0,0), collect litter at (0,1) and (1,2) in 5 moves.
```

**Example 2:**
```
Input: classroom = [[0,0,0],[0,0,0],[0,0,0]]
Output: 0
Explanation: No litter to collect, so zero moves.
```

## Approach

**Algorithm:** Breadth‑First Search with Bitmask State

We treat each litter piece as a bit in a mask. The BFS state is `(row, col, mask)` where `mask` records which pieces have been collected. Starting from the initial position with mask = 0, we explore neighboring cells, updating the mask when stepping onto a litter cell. The first time we reach a state where `mask` equals `allCollected` we have the minimum moves.

```text
FUNCTION minMoves(classroom):
    L ← number of litter pieces
    allMask ← (1 << L) - 1
    start ← findStart(classroom)
    queue ← [(start.row, start.col, 0, 0)] // (r, c, mask, steps)
    visited ← set of (r, c, mask)
    WHILE queue NOT EMPTY:
        (r, c, mask, steps) ← DEQUEUE(queue)
        IF mask == allMask: RETURN steps
        FOR each (nr, nc) in neighbors(r, c):
            newMask ← mask
            IF classroom[nr][nc] is litter with index i:
                newMask ← mask OR (1 << i)
            IF (nr, nc, newMask) NOT IN visited:
                ADD (nr, nc, newMask) TO visited
                ENQUEUE(queue, (nr, nc, newMask, steps + 1))
    RETURN -1
```

## Walkthrough

| Step | Position | Collected Mask | Action |
|------|----------|----------------|--------|
| 1 | (0,0,0) | 0 | Start state |
| 2 | (0,1,1) | 1 | Move right, collect first litter |
| 3 | (1,1,1) | 1 | Move down |
| 4 | (1,2,3) | 3 | Move right, collect second litter → all collected |

## Complexity Analysis

- **Time:** O(R · C · 2^L) – each cell combined with each possible mask may be visited.
- **Space:** O(R · C · 2^L) – for the visited set and BFS queue.

## Follow‑Up Questions

1. How would the solution change if the number of litter pieces were large (e.g., > 15)?
2. Can you adapt the algorithm for weighted moves where each step has a different cost?
3. What if the robot could teleport to any empty cell?

## Key Takeaway

> When a grid contains a small number of collectible items, **BFS with a bitmask** efficiently captures both position and collection state, yielding the optimal number of moves.
