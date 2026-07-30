# 2577. Minimum Time to Visit a Cell In a Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-visit-a-cell-in-a-grid](https://leetcode.com/problems/minimum-time-to-visit-a-cell-in-a-grid)
**Companies:** Amazon, Atlassian, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Dijkstra — O(mn log(mn))](#4-approach-dijkstra--omn-logmn)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a grid where `grid[r][c]` is the earliest time you can visit cell `(r,c)`, starting at `(0,0)` at time 0. Each second, move to an adjacent cell. Return minimum time to reach `(m-1, n-1)`, or `-1`.

**Constraints:**
- `1 <= m, n <= 1000`

---

## 2. Examples

```
Example 1:
  Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
  Output: 7

Example 2:
  Input: grid = [[0,2,4],[3,2,1],[1,0,4]]
  Output: -1 (if both neighbors of (0,0) require time > 1)
```

---

## 3. Key Insight

> Modified Dijkstra. If `grid[nr][nc] > t+1`, you can "wait" by oscillating back and forth between the current cell and a neighbor. The parity determines if you need +0 or +1 extra wait. Impossible only if *both* neighbors of `(0,0)` require time > 1.

---

## 4. Approach: Dijkstra — O(mn log(mn)) ✅

```
FUNCTION minimumTime(grid):
    IF grid[0][1] > 1 AND grid[1][0] > 1: RETURN -1

    heap = [(0, 0, 0)]
    dist = m × n of infinity; dist[0][0] = 0

    WHILE heap:
        (t, r, c) = heap.POP()
        IF r == m-1 AND c == n-1: RETURN t
        FOR (nr, nc) IN neighbors:
            // If grid[nr][nc] > t+1, need to wait (oscillate back and forth)
            wait = 0 IF (grid[nr][nc] - t) % 2 == 1 ELSE 1
            nt = MAX(t + 1, grid[nr][nc] + wait)
            IF nt < dist[nr][nc]:
                dist[nr][nc] = nt
                heap.PUSH((nt, nr, nc))
```

---

## 5. Walkthrough

```
Key parity trick:
  At time t, want to enter cell with grid value g.
  If g ≤ t+1: enter at t+1.
  If g > t+1: need to wait. Can oscillate between current and prev cell.
    If (g - t) is odd → arrive at exactly g.
    If (g - t) is even → arrive at g+1 (need one extra step).
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(mn · log(mn)) — Dijkstra with priority queue |
| **Space** | O(mn) — distance grid |

---

## 7. Key Takeaway

> **Dijkstra with waiting via oscillation** — the parity trick handles "time gates" elegantly. If you can't enter a cell yet, oscillate back and forth until the right time. Only `(0,0)` can be stuck (no previous cell to oscillate with).
