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

You are given a `m x n` matrix `grid` consisting of **non-negative** integers where `grid[row][col]` represents the **minimum** time required to be able to visit the cell `(row, col)`, which means you can visit the cell `(row, col)` only when the time you visit it is greater than or equal to `grid[row][col]`.

You are standing in the **top-left** cell of the matrix in the `0^th` second, and you must move to **any** adjacent cell in the four directions: up, down, left, and right. Each move you make takes 1 second.

Return *the **minimum** time required in which you can visit the bottom-right cell of the matrix*. If you cannot visit the bottom-right cell, then return `-1`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 1000`
- `4 <= m * n <= 10^5`
- `0 <= grid[i][j] <= 10^5`
- `grid[0][0] == 0`

---

## 2. Examples

**Example 1:**
```
Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
Output: 7
Explanation: One of the paths that we can take is the following:
- at t = 0, we are on the cell (0,0).
- at t = 1, we move to the cell (0,1). It is possible because grid[0][1] <= 1.
- at t = 2, we move to the cell (1,1). It is possible because grid[1][1] <= 2.
- at t = 3, we move to the cell (1,2). It is possible because grid[1][2] <= 3.
- at t = 4, we move to the cell (1,1). It is possible because grid[1][1] <= 4.
- at t = 5, we move to the cell (1,2). It is possible because grid[1][2] <= 5.
- at t = 6, we move to the cell (1,3). It is possible because grid[1][3] <= 6.
- at t = 7, we move to the cell (2,3). It is possible because grid[2][3] <= 7.
The final time is 7. It can be shown that it is the minimum time possible.
```

**Example 2:**
```
Input: grid = [[0,2,4],[3,2,1],[1,0,4]]
Output: -1
Explanation: There is no path from the top left to the bottom-right cell.
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
