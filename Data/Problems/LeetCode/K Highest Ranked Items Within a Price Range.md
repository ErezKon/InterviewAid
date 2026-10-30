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

You are given a **0-indexed** 2D integer array `grid` of size `m x n` that represents a map of the items in a shop. The integers in the grid represent the following:

- `0` represents a wall that you cannot pass through.
- `1` represents an empty cell that you can freely move to and from.
- All other positive integers represent the price of an item in that cell. You may also freely move to and from these item cells.

It takes `1` step to travel between adjacent grid cells.

You are also given integer arrays `pricing` and `start` where `pricing = [low, high]` and `start = [row, col]` indicates that you start at the position `(row, col)` and are interested only in items with a price in the range of `[low, high]` (**inclusive**). You are further given an integer `k`.

You are interested in the **positions** of the `k` **highest-ranked** items whose prices are **within** the given price range. The rank is determined by the **first** of these criteria that is different:

- Distance, defined as the length of the shortest path from the `start` (**shorter** distance has a higher rank).
- Price (**lower** price has a higher rank, but it must be **in the price range**).
- The row number (**smaller** row number has a higher rank).
- The column number (**smaller** column number has a higher rank).

Return *the *`k`* highest-ranked items within the price range **sorted** by their rank (highest to lowest)*. If there are fewer than `k` reachable items within the price range, return ***all** of them*.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `0 <= grid[i][j] <= 10^5`
- `pricing.length == 2`
- `2 <= low <= high <= 10^5`
- `start.length == 2`
- `0 <= row <= m - 1`
- `0 <= col <= n - 1`
- `grid[row][col] > 0`
- `1 <= k <= m * n`

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

**Example 1:**
```
Input: grid = [[1,2,0,1],[1,3,0,1],[0,2,5,1]], pricing = [2,5], start = [0,0], k = 3
Output: [[0,1],[1,1],[2,1]]
Explanation: You start at (0,0).
With a price range of [2,5], we can take items from (0,1), (1,1), (2,1) and (2,2).
The ranks of these items are:
- (0,1) with distance 1
- (1,1) with distance 2
- (2,1) with distance 3
- (2,2) with distance 4
Thus, the 3 highest ranked items in the price range are (0,1), (1,1), and (2,1).
```

**Example 2:**
```
Input: grid = [[1,2,0,1],[1,3,3,1],[0,2,5,1]], pricing = [2,3], start = [2,3], k = 2
Output: [[2,1],[1,2]]
Explanation: You start at (2,3).
With a price range of [2,3], we can take items from (0,1), (1,1), (1,2) and (2,1).
The ranks of these items are:
- (2,1) with distance 2, price 2
- (1,2) with distance 2, price 3
- (1,1) with distance 3
- (0,1) with distance 4
Thus, the 2 highest ranked items in the price range are (2,1) and (1,2).
```

**Example 3:**
```
Input: grid = [[1,1,1],[0,0,1],[2,3,4]], pricing = [2,3], start = [0,0], k = 3
Output: [[2,1],[2,0]]
Explanation: You start at (0,0).
With a price range of [2,3], we can take items from (2,0) and (2,1).
The ranks of these items are:
- (2,1) with distance 5
- (2,0) with distance 6
Thus, the 2 highest ranked items in the price range are (2,1) and (2,0).
Note that k = 3 but there are only 2 reachable items within the price range.
```

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
