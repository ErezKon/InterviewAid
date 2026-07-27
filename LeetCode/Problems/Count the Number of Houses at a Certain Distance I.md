# 3015. Count the Number of Houses at a Certain Distance I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i)
**Companies:** Oracle

---

## Problem Description

Same as the Hard version but with small constraints (n ≤ 100), allowing O(n³) BFS or Floyd-Warshall.

---

## Approach

```
FUNCTION countOfPairs(n, x, y):
    // Build adjacency: i↔i+1 for all i, plus x↔y
    // Floyd-Warshall or BFS from each node
    dist = [[INF]*n for _ in range(n)]
    FOR i: dist[i][i] = 0
    FOR i: dist[i][i+1] = dist[i+1][i] = 1
    dist[x-1][y-1] = dist[y-1][x-1] = 1

    // Floyd-Warshall
    FOR k, i, j: dist[i][j] = MIN(dist[i][j], dist[i][k] + dist[k][j])

    result = [0] * n
    FOR i < j: result[dist[i][j] - 1] += 2  // count both (i,j) and (j,i)
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³) |
| **Space** | O(n²) |

---

## Key Takeaway

> **Small constraints (n ≤ 100) allow Floyd-Warshall for all-pairs shortest paths. The hard version requires O(n) math.**
