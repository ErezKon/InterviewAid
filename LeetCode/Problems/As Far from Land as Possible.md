# 1162. As Far from Land as Possible

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/as-far-from-land-as-possible](https://leetcode.com/problems/as-far-from-land-as-possible)
**Companies:** Amazon, Google, Hive, Microsoft, Uipath, Wix

---

## Approach: Multi-source BFS — O(n²) ✅

```
FUNCTION maxDistance(grid):
    n = len(grid)
    queue = [(r, c) for r, c where grid[r][c] == 1]
    IF len(queue) == 0 OR len(queue) == n*n: RETURN -1

    dist = 0
    WHILE queue:
        nextQueue = []
        FOR (r, c) IN queue:
            FOR (nr, nc) IN neighbors:
                IF grid[nr][nc] == 0:
                    grid[nr][nc] = 1
                    nextQueue.ADD((nr, nc))
        queue = nextQueue
        IF queue: dist += 1

    RETURN dist
```

BFS from all land simultaneously. Last water cell reached = maximum distance.
