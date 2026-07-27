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
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a grid, a starting position, a price range `[low, high]`, and `k`, find the `k` highest-ranked items within the price range. Ranking: distance (BFS) → price → row → column.

---

## 2. Key Insight

BFS from start gives distances. Collect all items in price range, then sort by (distance, price, row, col) and return top k.

---

## 3. Approach: BFS + Multi-Key Sort — O(m·n·log(m·n)) ✅

```
FUNCTION highestRankedKItems(grid, pricing, start, k):
    low, high = pricing
    candidates = []
    visited = set()
    queue = [(start[0], start[1], 0)]   // row, col, dist
    visited.ADD((start[0], start[1]))

    WHILE queue:
        r, c, dist = queue.DEQUEUE()
        IF low <= grid[r][c] <= high:
            candidates.ADD((dist, grid[r][c], r, c))
        FOR (nr, nc) IN neighbors(r, c):
            IF valid AND grid[nr][nc] != 0 AND (nr,nc) NOT IN visited:
                visited.ADD((nr, nc))
                queue.ENQUEUE((nr, nc, dist + 1))

    candidates.SORT()
    RETURN [[r, c] for (_, _, r, c) in candidates[:k]]
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m·n·log(m·n)) | BFS + sort |
| Space | O(m·n) | Visited set + candidates |

---

## 5. Key Takeaway

> BFS for distance + multi-key sort for ranking. The sort key `(distance, price, row, col)` directly encodes the problem's ranking criteria.
