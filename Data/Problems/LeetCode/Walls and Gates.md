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

```text
FUNCTION wallsAndGates(rooms):
    // Initialize queue with all gate positions
    SET queue ← EMPTY QUEUE
    FOR r ← 0 TO rows-1:
        FOR c ← 0 TO cols-1:
            IF rooms[r][c] == 0:
                ENQUEUE (r, c) INTO queue

    WHILE queue NOT EMPTY:
        SET (r, c) ← DEQUEUE(queue)
        FOR (dr, dc) IN [(0,1),(0,-1),(1,0),(-1,0)]:
            SET nr ← r + dr
            SET nc ← c + dc
            IF nr IN BOUNDS AND nc IN BOUNDS AND rooms[nr][nc] == INF:
                SET rooms[nr][nc] ← rooms[r][c] + 1
                ENQUEUE (nr, nc) INTO queue

    RETURN rooms
```

---

## 3. Examples

| Input Grid | Output Grid |
|------------|-------------|
| `[[INF, -1, 0, INF], [INF, INF, INF, -1], [INF, -1, INF, -1], [0, -1, INF, INF]]` | `[[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]]` |
| `[[INF, INF, INF], [INF, 0, INF], [INF, INF, INF]]` | `[[2, 1, 2], [1, 0, 1], [2, 1, 2]]` |

---

## 4. Walkthrough

Consider the first example grid:

1. **Initialize queue** with gate cells at positions `(0,2)` and `(3,0)`.
2. **Level 0**: Dequeue `(0,2)`. Its neighbors `(0,3)` and `(1,2)` are `INF`, set them to `1` and enqueue.
3. Dequeue `(3,0)`. Neighbor `(2,0)` becomes `1`, enqueue.
4. **Level 1**: Process cells with distance `1` (e.g., `(0,3)`). Their `INF` neighbors get distance `2`.
5. Continue until the queue is empty. Every empty room now holds the shortest distance to any gate.

---

## 5. Complexity Analysis

- **Time:** O(m·n) – each cell is visited at most once.
- **Space:** O(m·n) – queue may hold all cells in the worst case.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to also return the coordinates of the nearest gate for each room?
- Can you solve the problem in-place without using an explicit queue (e.g., using DFS with memoization)?
- What changes are needed if diagonal moves are allowed?

---

## Key Takeaway

> Multi‑source BFS from all gates propagates distances in optimal order; each empty room is filled with the shortest path length to the nearest gate.
