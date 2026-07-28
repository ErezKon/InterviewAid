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

Given a grid with a start `S`, destination `D`, walls `X`, and flood sources `*`. Each second, water spreads to adjacent land cells and you move one step. You cannot enter a flooded cell or a cell that floods at the same time. Return the **minimum** time to reach `D`, or `-1`.

**Constraints:**
- `1 <= m, n <= 2000`

---

## 2. Examples

**Example 1:**
```
grid = [
  ["S", ".", ".", "*"],
  [".", "X", ".", "."],
  [".", ".", "*", "D"]
]
Output: 5
```
*Explanation:* Water reaches the bottom‑right cell at time 4, so you must arrive at `D` by time 3. The shortest safe path takes 5 steps.

**Example 2:**
```
grid = [
  ["S", "*"],
  ["X", "D"]
]
Output: -1
```
*Explanation:* The flood source is adjacent to the start; you cannot move without stepping into water.

---

## 3. Key Insight

> **Two-phase BFS**: First, multi‑source BFS from all flood sources to compute `floodTime[r][c]` — the time each cell gets flooded. Then BFS from `S`, only entering cells where `yourTime < floodTime[r][c]`.

---

## 4. Approach: Multi-Source BFS + BFS — O(mn) ✅

```text
FUNCTION minimumTime(grid):
    // Phase 1: Multi‑source BFS from all '*' cells
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

Consider **Example 1**.
| Step | Person Position | Time | Flood Spread (cells flooded at this time) |
|------|-----------------|------|-------------------------------------------|
| 0    | (0,0) `S`       | 0    | `*` at (0,3) and (2,2)                     |
| 1    | (0,1)           | 1    | (0,2), (1,3)                               |
| 2    | (0,2)           | 2    | (0,1), (1,2), (2,3)                        |
| 3    | (1,2)           | 3    | (1,1) is a wall, flood reaches (2,2) at 3 |
| 4    | (2,2) (cannot)  | —    | Flood arrives at time 3, so this cell is unsafe |
| 5    | (2,3) `D`       | 5    | Person arrives before flood (flood at 4)   |

The algorithm’s first BFS records flood times like `floodTime[2][3] = 4`. The second BFS follows the safe path (0,0)→(0,1)→(0,2)→(1,2)→(2,3), arriving at time 5, which matches the output.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m × n) — two passes of BFS |
| **Space** | O(m × n) for `floodTime` and visited set |

---

## 7. Follow-Up Questions

1. How would the solution change if water could flow diagonally?
2. What if you could build temporary barriers on empty cells?
3. Can the same two‑phase BFS pattern be applied to fire‑spread or virus‑spread scenarios?

---

## 8. Key Takeaway

> **Flood‑fill then path‑find** — pre‑compute when each cell becomes unsafe, then perform a constrained BFS where you only move into cells that remain safe at your arrival time.
