# 286. Walls and Gates

**Difficulty:** 🟡 Medium
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/walls-and-gates](https://leetcode.com/problems/walls-and-gates)
**Companies:** Amazon, Bloomberg, Doordash, Ebay, Google, Meta, Microsoft, Snowflake, Spotify, Tiktok, Uber, Visa

---

## 1. Problem Description

Given an m×n grid with values: `-1` (wall), `0` (gate), `INF` (empty room), fill each empty room with the distance to its nearest gate. If impossible, leave as INF.

---

## 2. Approach: Multi-Source BFS — O(m·n) ✅

Same pattern as Rotting Oranges: start BFS from all gates simultaneously.

```
FUNCTION wallsAndGates(rooms):
    queue = all cells with value 0 (gates)

    WHILE queue not empty:
        (r, c) = queue.DEQUEUE()
        FOR (dr, dc) IN [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            IF in bounds AND rooms[nr][nc] == INF:
                rooms[nr][nc] = rooms[r][c] + 1
                queue.ENQUEUE((nr, nc))
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Key Takeaway

> Multi-source BFS from all gates fills distances optimally. Each cell is visited at most once. Same pattern as Rotting Oranges and 01 Matrix.
