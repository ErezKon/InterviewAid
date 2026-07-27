# 1102. Path With Maximum Minimum Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-minimum-value](https://leetcode.com/problems/path-with-maximum-minimum-value)
**Companies:** Amazon, Geico, Google

---

```
FUNCTION maximumMinimumPath(grid):
    // Max-heap Dijkstra variant
    m, n = dimensions
    heap = [(-grid[0][0], 0, 0)]    // negate for max-heap
    visited = set()
    WHILE heap:
        neg_min, r, c = heappop(heap)
        IF r == m-1 AND c == n-1: RETURN -neg_min
        IF (r,c) IN visited: CONTINUE
        visited.ADD((r,c))
        FOR (nr, nc) IN neighbors:
            IF valid AND (nr,nc) NOT IN visited:
                heappush(heap, (-MIN(-neg_min, grid[nr][nc]), nr, nc))
```
