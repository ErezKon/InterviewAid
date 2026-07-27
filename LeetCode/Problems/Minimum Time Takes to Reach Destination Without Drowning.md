# 2814. Minimum Time Takes to Reach Destination Without Drowning

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-takes-to-reach-destination-without-drowning](https://leetcode.com/problems/minimum-time-takes-to-reach-destination-without-drowning)
**Companies:** Wix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Multi-Source BFS + BFS — O(mn)](#3-approach-multi-source-bfs--bfs--omn)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a grid with a start `S`, destination `D`, walls `X`, and flood sources `*`. Each second, water spreads to adjacent land cells and you move one step. You cannot enter a flooded cell or a cell that floods at the same time. Return the **minimum** time to reach `D`, or `-1`.

**Constraints:**
- `1 <= m, n <= 2000`

---

## 2. Key Insight

> **Two-phase BFS**: First, multi-source BFS from all flood sources to compute `floodTime[r][c]` — the time each cell gets flooded. Then BFS from `S`, only entering cells where `yourTime < floodTime[r][c]`.

---

## 3. Approach: Multi-Source BFS + BFS — O(mn) ✅

```
FUNCTION minimumTime(grid):
    // Phase 1: Multi-source BFS from all '*' cells
    floodTime = m × n of infinity
    queue = all '*' positions with time 0
    BFS to fill floodTime

    // Phase 2: BFS from S
    queue = [(sr, sc, 0)]
    visited = set()
    WHILE queue:
        (r, c, t) = queue.POPLEFT()
        IF (r, c) == D: RETURN t
        FOR (nr, nc) IN neighbors:
            IF valid AND NOT visited AND NOT wall
               AND t + 1 < floodTime[nr][nc]:
                visited.ADD((nr, nc))
                queue.APPEND((nr, nc, t + 1))

    RETURN -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(mn) — two BFS passes |
| **Space** | O(mn) |

---

## 5. Key Takeaway

> **Flood-fill then pathfind** — precompute when each cell floods, then BFS for the person with the constraint `arrivalTime < floodTime`. Classic "expanding obstacle" BFS pattern.
