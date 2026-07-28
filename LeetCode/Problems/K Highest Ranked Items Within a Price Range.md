# 2146. K Highest Ranked Items Within a Price Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-highest-ranked-items-within-a-price-range](https://leetcode.com/problems/k-highest-ranked-items-within-a-price-range)
**Companies:** Bookingcom

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: BFS + Multi-Key Sort — O(m·n·log(m·n)) ✅](#3-approach-bfs--multi-key-sort--omnlogmn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a grid, a starting position, a price range `[low, high]`, and `k`, find the `k` highest‑ranked items within the price range. Ranking is defined by distance from the start (BFS), then price, then row, then column.

---

## 2. Key Insight

BFS from the start yields the minimum distance to every reachable cell. While traversing, collect cells whose price lies in `[low, high]`. After BFS, sort the collected items by the tuple `(distance, price, row, col)` and return the first `k`.

---

## 3. Approach: BFS + Multi‑Key Sort — O(m·n·log(m·n)) ✅

```text
FUNCTION highestRankedKItems(grid, pricing, start, k):
    low, high ← pricing[0], pricing[1]
    m ← ROW_COUNT(grid)
    n ← COL_COUNT(grid)
    visited ← MATRIX m×n FALSE
    queue ← []
    candidates ← []
    ENQUEUE(queue, (start[0], start[1], 0))
    visited[start[0]][start[1]] ← TRUE

    WHILE queue NOT EMPTY:
        r, c, dist ← DEQUEUE(queue)
        IF low ≤ grid[r][c] ≤ high:
            APPEND(candidates, (dist, grid[r][c], r, c))
        FOR (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            IF 0 ≤ nr < m AND 0 ≤ nc < n AND grid[nr][nc] != 0 AND NOT visited[nr][nc]:
                visited[nr][nc] ← TRUE
                ENQUEUE(queue, (nr, nc, dist + 1))

    SORT(candidates)  // by distance, price, row, column
    RETURN [[r, c] FOR (_, _, r, c) IN candidates[0 : k]]
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time   | O(m·n·log(m·n)) | BFS visits each cell once; sorting at most m·n candidates |
| Space  | O(m·n) | Visited matrix and candidate list |

---

## 5. Examples

| grid | pricing | start | k | Output |
|------|---------|-------|---|--------|
| [[1,2,0],[3,4,5],[0,6,7]] | [2,5] | [0,0] | 3 | [[0,1],[1,0],[1,1]] |
| [[0,1,2],[3,0,4],[5,6,0]] | [1,6] | [2,0] | 2 | [[2,1],[1,0]] |

*Explanation*: In the first example, reachable items within price range are at positions (0,1) price 2, (1,0) price 3, (1,1) price 4. They are already ordered by distance then price.

---

## 6. Walkthrough

**Example 1** – `grid = [[1,2,0],[3,4,5],[0,6,7]]`, `pricing = [2,5]`, `start = [0,0]`, `k = 3`

| Step | Queue (r,c,dist) | Visited cells | Candidates (dist,price,r,c) |
|------|------------------|---------------|------------------------------|
| Init | [(0,0,0)] | {(0,0)} | – |
| Dequeue (0,0,0) | [(0,1,1),(1,0,1)] | {(0,0),(0,1),(1,0)} | – (price 1 not in range) |
| Dequeue (0,1,1) | [(1,0,1),(0,2,2)] | add (0,1) to candidates → (1,2,0,1) |
| Dequeue (1,0,1) | [(0,2,2),(1,1,2)] | add (1,0) → (1,3,1,0) |
| Dequeue (0,2,2) – blocked (value 0) |
| Dequeue (1,1,2) | [(1,2,3),(2,1,3)] | add (1,1) → (2,4,1,1) |
| … | … | … | … |

After BFS finishes, candidates = [(1,2,0,1),(1,3,1,0),(2,4,1,1)]. Sorting yields the same order; returning first 3 gives `[[0,1],[1,0],[1,1]]`.

---

## 7. Follow‑Up Questions

1. How would you adapt the algorithm if diagonal moves were allowed?
2. Can you solve the problem with O(k log k) additional space by maintaining a min‑heap of size k instead of sorting all candidates?
3. What changes are needed if the ranking priority order is altered (e.g., price before distance)?

---

## 8. Key Takeaway

> Use BFS to obtain exact distances, then a multi‑key sort (or heap) to rank items according to the problem’s hierarchical criteria.
