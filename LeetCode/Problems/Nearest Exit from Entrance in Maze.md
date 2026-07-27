# 1926. Nearest Exit from Entrance in Maze

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nearest-exit-from-entrance-in-maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze)
**Companies:** Amazon, Bloomberg, Ebay, Google, Meta, Microsoft, Paypal, Uber, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: BFS — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a maze with walls (`+`) and empty cells (`.`), find the **nearest** exit (border cell) from the entrance. Return the number of steps, or `-1` if impossible.

**Constraints:**
- `1 <= m, n <= 100`

---

## 2. Key Insight

> BFS from entrance guarantees shortest path. An exit is any empty border cell other than the entrance itself.

---

## 3. Approach: BFS — O(m·n) ✅

```
FUNCTION nearestExit(maze, entrance):
    m, n = dimensions
    queue = [(entrance[0], entrance[1], 0)]
    maze[entrance[0]][entrance[1]] = '+'    // mark visited

    WHILE queue:
        (r, c, steps) = queue.DEQUEUE()
        FOR (nr, nc) IN 4 directions:
            IF out of bounds OR maze[nr][nc] == '+': CONTINUE
            IF nr == 0 OR nr == m-1 OR nc == 0 OR nc == n-1:
                RETURN steps + 1    // reached border = exit
            maze[nr][nc] = '+'
            queue.ENQUEUE((nr, nc, steps + 1))

    RETURN -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(m · n) — queue |

---

## 5. Key Takeaway

> **BFS for shortest path in unweighted grid.** Mark entrance as visited immediately. First border cell reached is the nearest exit.
