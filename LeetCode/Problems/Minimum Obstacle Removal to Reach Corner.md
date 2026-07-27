# 2290. Minimum Obstacle Removal to Reach Corner

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Bloomberg, Google
---

```
FUNCTION minimumObstacles(grid):
    // 0-1 BFS: cost 0 for empty, cost 1 for obstacle
    m, n = dimensions
    dist = m × n of infinity; dist[0][0] = 0
    deque = [(0, 0, 0)]
    WHILE deque:
        d, r, c = deque.POPLEFT()
        FOR (nr, nc) IN neighbors:
            nd = d + grid[nr][nc]
            IF nd < dist[nr][nc]:
                dist[nr][nc] = nd
                IF grid[nr][nc] == 0: deque.APPENDLEFT((nd, nr, nc))
                ELSE: deque.APPEND((nd, nr, nc))
    RETURN dist[m-1][n-1]
```
