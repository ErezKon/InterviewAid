# 1631. Path With Minimum Effort

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-minimum-effort](https://leetcode.com/problems/path-with-minimum-effort)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Nutanix, Snowflake, Visa, Waymo

---

## Approach: Modified Dijkstra — O(mn log(mn)) ✅

```
FUNCTION minimumEffortPath(heights):
    m, n = dimensions
    dist = m×n matrix of infinity
    dist[0][0] = 0
    heap = [(0, 0, 0)]

    WHILE heap:
        (effort, r, c) = heap.POP_MIN()
        IF r == m-1 AND c == n-1: RETURN effort
        IF effort > dist[r][c]: CONTINUE

        FOR (nr, nc) IN 4 directions:
            newEffort = MAX(effort, ABS(heights[nr][nc] - heights[r][c]))
            IF newEffort < dist[nr][nc]:
                dist[nr][nc] = newEffort
                heap.PUSH((newEffort, nr, nc))

    RETURN 0
```

Minimax path: minimize the maximum absolute height difference along the path.
