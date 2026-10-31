# 2814. Minimum Time Takes to Reach Destination Without Drowning

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-takes-to-reach-destination-without-drowning](https://leetcode.com/problems/minimum-time-takes-to-reach-destination-without-drowning)
**Companies:** Wix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Multi-Source BFS + BFS — O(mn)](#4-approach-multi-source-bfs--bfs--omn)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an `n * m` **0-indexed** grid of string `land`. Right now, you are standing at the cell that contains `"S"`, and you want to get to the cell containing `"D"`. There are three other types of cells in this land:

- `"."`: These cells are empty.
- `"X"`: These cells are stone.
- `"*"`: These cells are flooded.

At each second, you can move to a cell that shares a side with your current cell (if it exists). Also, at each second, every **empty cell** that shares a side with a flooded cell becomes flooded as well.**
There are two problems ahead of your journey:

- You can't step on stone cells.
- You can't step on flooded cells since you will drown (also, you can't step on a cell that will be flooded at the same time as you step on it).

Return* the **minimum** time it takes you to reach the destination in seconds, or *`-1`* if it is impossible.*

**Note** that the destination will never be flooded.

**Constraints:**
- `2 <= n, m <= 100`
- `land` consists only of `"S"`, `"D"`, `"."`, `"*"` and `"X"`.
- **Exactly** one of the cells is equal to `"S"`.
- **Exactly** one of the cells is equal to `"D"`.

---

## 2. Examples

**Example 1:**
```
Input: land = [["D",".","*"],[".",".","."],[".","S","."]]
Output: 3
Explanation: The picture below shows the simulation of the land second by second. The blue cells are flooded, and the gray cells are stone.
Picture (0) shows the initial state and picture (3) shows the final state when we reach destination. As you see, it takes us 3 second to reach destination and the answer would be 3.
It can be shown that 3 is the minimum time needed to reach from S to D.
```

**Example 2:**
```
Input: land = [["D","X","*"],[".",".","."],[".",".","S"]]
Output: -1
Explanation: The picture below shows the simulation of the land second by second. The blue cells are flooded, and the gray cells are stone.
Picture (0) shows the initial state. As you see, no matter which paths we choose, we will drown at the 3^rd second. Also the minimum path takes us 4 seconds to reach from S to D.
So the answer would be -1.
```

**Example 3:**
```
Input: land = [["D",".",".",".","*","."],[".","X",".","X",".","."],[".",".",".",".","S","."]]
Output: 6
Explanation: It can be shown that we can reach destination in 6 seconds. Also it can be shown that 6 is the minimum seconds one need to reach from S to D.
```

---

## 3. Key Insight

> **Two-phase BFS**: First, multi-source BFS from all flood sources to compute `floodTime[r][c]` — the time each cell gets flooded. Then BFS from `S`, only entering cells where `yourTime < floodTime[r][c]`.

---

## 4. Approach: Multi-Source BFS + BFS — O(mn) ✅

```text
FUNCTION minimumTime(grid):
    // Phase 1: Multi-source BFS from all '*' cells
    floodTime ← matrix of size m×n filled with INF
    queue ← all positions (r,c) where grid[r][c] == '*', each with time 0
    WHILE queue NOT EMPTY:
        (r, c, t) ← queue.POPLEFT()
        IF floodTime[r][c] ≤ t: CONTINUE
        floodTime[r][c] ← t
        FOR each neighbor (nr, nc) of (r, c):
            IF inside grid AND grid[nr][nc] != 'X' AND floodTime[nr][nc] == INF:
                queue.APPEND((nr, nc, t + 1))

    // Phase 2: BFS from start S respecting flood times
    queue ← [(sr, sc, 0)]   // sr, sc are start coordinates
    visited ← set((sr, sc))
    WHILE queue NOT EMPTY:
        (r, c, t) ← queue.POPLEFT()
        IF grid[r][c] == 'D': RETURN t
        FOR each neighbor (nr, nc) of (r, c):
            IF inside grid AND grid[nr][nc] != 'X' AND (nr, nc) NOT IN visited:
                // You may step only if you arrive before water
                IF t + 1 < floodTime[nr][nc]:
                    visited.ADD((nr, nc))
                    queue.APPEND((nr, nc, t + 1))
    RETURN -1
```

---

## 5. Walkthrough

Consider **Example 1**.
| Step | Person Position | Time | Flood Spread (cells flooded at this time) |
|------|-----------------|------|-------------------------------------------|
| 0    | (0,0) `S`       | 0    | `*` at (0,3) and (2,2)                     |
| 1    | (0,1)           | 1    | (0,2), (1,3)                               |
| 2    | (0,2)           | 2    | (0,1), (1,2), (2,3)                        |
| 3    | (1,2)           | 3    | (1,1) is a wall, flood reaches (2,2) at 3 |
| 4    | (2,2) (cannot)  | —    | Flood arrives at time 3, so this cell is unsafe |
| 5    | (2,3) `D`       | 5    | Person arrives before flood (flood at 4)   |

The algorithm’s first BFS records flood times like `floodTime[2][3] = 4`. The second BFS follows the safe path (0,0)→(0,1)→(0,2)→(1,2)→(2,3), arriving at time 5, which matches the output.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m × n) — two passes of BFS |
| **Space** | O(m × n) for `floodTime` and visited set |

---

## 7. Follow-Up Questions

1. How would the solution change if water could flow diagonally?
2. What if you could build temporary barriers on empty cells?
3. Can the same two-phase BFS pattern be applied to fire-spread or virus-spread scenarios?

---

## 8. Key Takeaway

> **Flood-fill then path-find** — pre-compute when each cell becomes unsafe, then perform a constrained BFS where you only move into cells that remain safe at your arrival time.
