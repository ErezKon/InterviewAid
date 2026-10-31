# 3568. Minimum Moves to Clean the Classroom

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-clean-the-classroom](https://leetcode.com/problems/minimum-moves-to-clean-the-classroom)
**Companies:** Bloomberg

---

## Problem Description

> *Note: the Approach below runs BFS over `(row, col, mask)` but ignores the energy limit and the reset cells `'R'`. Add the remaining energy to the state, `(row, col, mask, energy)`: each move costs 1 energy and stepping on `'R'` restores it to full. Prune with the best energy seen per `(row, col, mask)`.*

You are given an `m x n` grid `classroom` where a student volunteer is tasked with cleaning up litter scattered around the room. Each cell in the grid is one of the following:

- `'S'`: Starting position of the student
- `'L'`: Litter that must be collected (once collected, the cell becomes empty)
- `'R'`: Reset area that restores the student's energy to full capacity, regardless of their current energy level (can be used multiple times)
- `'X'`: Obstacle the student cannot pass through
- `'.'`: Empty space

You are also given an integer `energy`, representing the student's maximum energy capacity. The student starts with this energy from the starting position `'S'`.

Each move to an adjacent cell (up, down, left, or right) costs 1 unit of energy. If the energy reaches 0, the student can only continue if they are on a reset area `'R'`, which resets the energy to its **maximum** capacity `energy`.

Return the **minimum** number of moves required to collect all litter items, or `-1` if it's impossible.

**Constraints:**
- `1 <= m == classroom.length <= 20`
- `1 <= n == classroom[i].length <= 20`
- `classroom[i][j]` is one of `'S'`, `'L'`, `'R'`, `'X'`, or `'.'`
- `1 <= energy <= 50`
- There is exactly **one** `'S'` in the grid.
- There are **at most** 10 `'L'` cells in the grid.

## Examples

**Example 1:**
```
Input: classroom = ["S.", "XL"], energy = 2
Output: 2
Explanation: - The student starts at cell (0, 0) with 2 units of energy.
- Since cell (1, 0) contains an obstacle 'X', the student cannot move directly downward.
- A valid sequence of moves to collect all litter is as follows:
- Move 1: From (0, 0) → (0, 1) with 1 unit of energy and 1 unit remaining.
- Move 2: From (0, 1) → (1, 1) to collect the litter 'L'.
- The student collects all the litter using 2 moves. Thus, the output is 2.
```

**Example 2:**
```
Input: classroom = ["LS", "RL"], energy = 4
Output: 3
Explanation: - The student starts at cell (0, 1) with 4 units of energy.
- A valid sequence of moves to collect all litter is as follows:
- Move 1: From (0, 1) → (0, 0) to collect the first litter 'L' with 1 unit of energy used and 3 units remaining.
- Move 2: From (0, 0) → (1, 0) to 'R' to reset and restore energy back to 4.
- Move 3: From (1, 0) → (1, 1) to collect the second litter 'L'.
- The student collects all the litter using 3 moves. Thus, the output is 3.
```

**Example 3:**
```
Input: classroom = ["L.S", "RXL"], energy = 3
Output: -1
Explanation: No valid path collects all 'L'.
```

## Approach

**Algorithm:** Breadth-First Search with Bitmask State

We treat each litter piece as a bit in a mask. The BFS state is `(row, col, mask)` where `mask` records which pieces have been collected. Starting from the initial position with mask = 0, we explore neighboring cells, updating the mask when stepping onto a litter cell. The first time we reach a state where `mask` equals `allCollected` we have the minimum moves.

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

- **Time:** O(R · C · 2^L) – each cell combined with each possible mask may be visited.
- **Space:** O(R · C · 2^L) – for the visited set and BFS queue.

## Follow-Up Questions

1. How would the solution change if the number of litter pieces were large (e.g., > 15)?
2. Can you adapt the algorithm for weighted moves where each step has a different cost?
3. What if the robot could teleport to any empty cell?

## Key Takeaway

> When a grid contains a small number of collectible items, **BFS with a bitmask** efficiently captures both position and collection state, yielding the optimal number of moves.
