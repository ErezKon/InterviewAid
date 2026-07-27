# 994. Rotting Oranges

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/rotting-oranges](https://leetcode.com/problems/rotting-oranges)
**Companies:** Adobe, Amazon, Anduril, Apple, Bloomberg, Bytedance, C3 Ai, Commvault, Databricks, De Shaw, Doordash, Dream11, Ebay, Expedia, Flipkart, Goldman Sachs, Google, Ibm, Informatica, Infosys, Intuit, Linkedin, Lyft, Meta, Microsoft, Myntra, Nvidia, Openai, Oracle, Paypal, Phonepe, Rakuten, Roblox, Salesforce, Samsung, Servicenow, Snowflake, Tcs, Tekion, Tiktok, Uber, Visa, Vmware, Walmart Labs, Wix, Yandex, Zepto, Ziprecruiter, Zoho, Zoox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Multi-Source BFS — O(m·n) ✅](#3-approach-multi-source-bfs--omn-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

You are given an `m x n` grid where each cell can have one of three values:
- `0` — empty cell
- `1` — fresh orange
- `2` — rotten orange

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return the **minimum number of minutes** until no fresh orange remains. If this is impossible, return `-1`.

**Constraints:**
- `1 <= m, n <= 10`
- `grid[i][j]` is `0`, `1`, or `2`.

---

## 2. Examples

```
Example 1:
  Input:  grid = [[2,1,1],[1,1,0],[0,1,1]]
  Output: 4

Example 2:
  Input:  grid = [[2,1,1],[0,1,1],[1,0,1]]
  Output: -1
  Reason: The orange in the bottom left corner is never reached.

Example 3:
  Input:  grid = [[0,2]]
  Output: 0
  Reason: No fresh oranges exist.
```

---

## 3. Approach: Multi-Source BFS — O(m·n) ✅

### Key Insight

This is a classic **multi-source BFS** problem. All rotten oranges start spreading simultaneously — exactly like BFS from multiple sources at once. Each BFS level = 1 minute.

### Pseudocode

```
FUNCTION orangesRotting(grid):

    queue = empty queue
    freshCount = 0
    rows, cols = dimensions of grid

    // Initialize: enqueue all rotten oranges, count fresh
    FOR each cell (r, c):
        IF grid[r][c] == 2:
            queue.ENQUEUE((r, c))
        ELSE IF grid[r][c] == 1:
            freshCount += 1

    IF freshCount == 0:
        RETURN 0

    minutes = 0
    directions = [(0,1), (0,-1), (1,0), (-1,0)]

    WHILE queue is not empty:
        size = queue.SIZE()
        FOR i ← 0 TO size - 1:
            (r, c) = queue.DEQUEUE()
            FOR (dr, dc) IN directions:
                nr, nc = r + dr, c + dc
                IF nr, nc in bounds AND grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    freshCount -= 1
                    queue.ENQUEUE((nr, nc))

        IF queue is not empty:
            minutes += 1

    RETURN minutes IF freshCount == 0 ELSE -1
```

---

## 4. Walkthrough

```
grid = [[2,1,1],
        [1,1,0],
        [0,1,1]]

Initial: queue = [(0,0)], freshCount = 6

Minute 1: (0,0) rots (0,1) and (1,0)
  grid = [[2,2,1],
          [2,1,0],
          [0,1,1]]
  freshCount = 4

Minute 2: (0,1) rots (0,2); (1,0) rots (1,1)  [note: no duplicate]
  grid = [[2,2,2],
          [2,2,0],
          [0,1,1]]
  freshCount = 2

Minute 3: (1,1) rots (2,1)
  grid = [[2,2,2],
          [2,2,0],
          [0,2,1]]
  freshCount = 1

Minute 4: (2,1) rots (2,2)
  grid = [[2,2,2],
          [2,2,0],
          [0,2,2]]
  freshCount = 0

Return 4 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) — each cell visited at most once |
| **Space** | O(m·n) — queue can hold all cells |

---

## 6. Follow-Up Questions

### 6.1 What if rotting spread diagonally too (8-directional)?

Add four diagonal directions: `(1,1), (1,-1), (-1,1), (-1,-1)`. Everything else stays the same.

### 6.2 What if some oranges are "immune" (won't rot)?

Add a value `3` for immune oranges. Don't count them as fresh, and don't rot them during BFS. Treat them like walls.

### 6.3 What about Walls and Gates (LeetCode #286)?

Same multi-source BFS pattern: start BFS from all gates simultaneously, fill each empty room with its distance to the nearest gate.

### 6.4 Can you solve this with DFS?

DFS would work but is suboptimal — it doesn't naturally process level-by-level (simultaneous spreading). You'd need to track distances and potentially revisit cells, making it O(m·n·max(m,n)) in the worst case.

---

## Key Takeaway

> **Multi-source BFS** is the pattern whenever "spreading happens simultaneously from multiple points." Enqueue all sources first, then process level by level. Each level = one time step.
