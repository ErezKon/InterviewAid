# 1926. Nearest Exit from Entrance in Maze

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nearest-exit-from-entrance-in-maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze)
**Companies:** Amazon, Bloomberg, Ebay, Google, Meta, Microsoft, Paypal, Uber, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: BFS — O(m·n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a maze with walls (`+`) and empty cells (`.`), find the **nearest** exit (border cell) from the entrance. Return the number of steps, or `-1` if impossible.

**Constraints:**
- `1 <= m, n <= 100`

---

## 2. Examples

| maze | entrance | Output |
|------|----------|--------|
| `[["+","+","+","+","+"],["+",".",".",".","+"],["+",".","+",".","+"],["+",".",".",".","+"],["+","+","+","+","+"]]` | `[1,2]` | `3` |
| `[["+","+","+"],["+",".","+"],["+","+","+"]]` | `[1,1]` | `-1` |

*Explanation*: In the first example the shortest path from entrance `(1,2)` to the nearest border exit takes 3 steps.

---

## 3. Approach: BFS — O(m·n) ✅

```text
FUNCTION nearestExit(maze, entrance):
    m ← NUMBER OF ROWS IN maze
    n ← NUMBER OF COLUMNS IN maze
    queue ← NEW QUEUE
    ENQUEUE(queue, (entrance[0], entrance[1], 0))
    maze[entrance[0]][entrance[1]] ← '+'  // mark visited
    WHILE queue IS NOT EMPTY:
        (r, c, steps) ← DEQUEUE(queue)
        FOR (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            IF nr < 0 OR nr >= m OR nc < 0 OR nc >= n: CONTINUE
            IF maze[nr][nc] == '+': CONTINUE
            IF nr == 0 OR nr == m-1 OR nc == 0 OR nc == n-1:
                RETURN steps + 1
            maze[nr][nc] ← '+'
            ENQUEUE(queue, (nr, nc, steps + 1))
    RETURN -1
```

---

## 4. Walkthrough

Consider the first example maze. Starting at `(1,2)`:

| Step | Position | Queue after step | Action |
|------|----------|------------------|--------|
| 0 | `(1,2,0)` | `[(1,2,0)]` | Enqueue start, mark visited |
| 1 | Dequeue `(1,2,0)` | Enqueue neighbors `(1,1,1)` and `(1,3,1)` | Both are empty cells |
| 2 | Dequeue `(1,1,1)` | Enqueue `(2,1,2)` | `(0,1)` is wall, `(1,0)` wall |
| 3 | Dequeue `(1,3,1)` | Enqueue `(2,3,2)` | `(0,3)` wall, `(1,4)` wall |
| 4 | Dequeue `(2,1,2)` | Enqueue `(3,1,3)` | `(2,0)` wall, `(2,2)` wall |
| 5 | Dequeue `(2,3,2)` | Enqueue `(3,3,3)` | `(2,4)` wall |
| 6 | Dequeue `(3,1,3)` → reaches border at row `3` (bottom) | RETURN `3` |

The first border cell reached is at distance 3, which is the nearest exit.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) |
| **Space** | O(m·n) — queue and visited marks |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return the actual path to the nearest exit?
2. Can you solve the problem using a bidirectional BFS to potentially reduce the search space?
3. How would the solution change if diagonal moves were allowed?

---

## 7. Key Takeaway

> **BFS for shortest path in unweighted grid.** Mark entrance as visited immediately. The first border cell reached is the nearest exit.
