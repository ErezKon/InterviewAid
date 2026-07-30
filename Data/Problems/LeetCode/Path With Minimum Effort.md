# 1631. Path With Minimum Effort

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-minimum-effort](https://leetcode.com/problems/path-with-minimum-effort)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Nutanix, Snowflake, Visa, Waymo

---

## Problem Description
You are given an `m × n` matrix `heights` where `heights[r][c]` represents the height of cell `(r, c)`. Starting at the top‑left cell `(0,0)`, you want to reach the bottom‑right cell `(m‑1,n‑1)`. The effort of a path is defined as the maximum absolute difference in heights between two consecutive cells along the path. Return the minimum possible effort among all paths.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `heights = [[1,2,2],[3,8,2],[5,3,5]]` | `2` | Path `1→2→2→2→5` has effort `max(|1-2|,|2-2|,|2-2|,|2-5|)=2`. |
| `heights = [[1,2,3],[3,8,4],[5,3,5]]` | `1` | The optimal path never needs a height jump larger than `1`. |
| `heights = [[1,2,1],[1,2,1],[1,1,1]]` | `0` | All moves have equal heights, so effort is `0`.

## Approach
Treat each edge between adjacent cells as having weight equal to the absolute height difference. The problem becomes finding a path that minimizes the maximum edge weight – a classic *min‑max* problem solvable with a modified Dijkstra (or binary search + BFS). Using Dijkstra, the priority queue stores the current effort to reach a cell; when expanding, the new effort is `max(currentEffort, edgeWeight)`. The first time we pop the target cell we have the optimal minimal effort.

```text
FUNCTION minimumEffortPath(heights):
    SET m ← NUMBER OF ROWS in heights
    SET n ← NUMBER OF COLUMNS in heights
    SET INF ← a very large number
    SET dist ← MATRIX m×n filled with INF
    SET dist[0][0] ← 0
    // min‑heap stores (effort, row, col)
    SET heap ← PRIORITY_QUEUE containing (0, 0, 0)
    SET directions ← [(1,0),(-1,0),(0,1),(0,-1)]

    WHILE heap IS NOT EMPTY:
        SET effort, r, c ← POP(heap)
        IF r = m-1 AND c = n-1:
            RETURN effort
        IF effort > dist[r][c]:
            CONTINUE
        FOR each (dr, dc) IN directions:
            SET nr ← r + dr
            SET nc ← c + dc
            IF nr < 0 OR nr ≥ m OR nc < 0 OR nc ≥ n: CONTINUE
            SET edge ← ABS(heights[nr][nc] - heights[r][c])
            SET newEffort ← MAX(effort, edge)
            IF newEffort < dist[nr][nc]:
                SET dist[nr][nc] ← newEffort
                PUSH(heap, (newEffort, nr, nc))
    RETURN -1  // unreachable (should not happen)
```

## Walkthrough
For the first example matrix:

| Step | Pop (r,c) | effort | Neighbors examined | Updated `dist` values |
|------|-----------|--------|--------------------|-----------------------|
| 1 | (0,0) | 0 | (1,0) edge=2 → dist[1,0]=2, (0,1) edge=1 → dist[0,1]=1 |
| 2 | (0,1) | 1 | (0,2) edge=0 → dist[0,2]=1, (1,1) edge=6 → dist[1,1]=6 |
| 3 | (0,2) | 1 | (1,2) edge=0 → dist[1,2]=1 |
| 4 | (1,2) | 1 | (2,2) edge=3 → dist[2,2]=3 (target reached later) |
| … | … | … | … | … |
| Final pop of (2,2) yields effort `2`.

## Complexity Analysis
- **Time:** O(m·n log(m·n)) – each cell may be processed once and heap operations are logarithmic.
- **Space:** O(m·n) for the distance matrix and the heap.

## Follow‑Up Questions
1. How would you solve the problem using binary search on the effort value combined with BFS?
2. Can the algorithm be adapted for 3‑D terrain (adding a third dimension)?
3. What changes are needed if diagonal moves are allowed?

## Key Takeaway
A Dijkstra‑style search that propagates the maximum edge weight seen so far yields the minimal possible effort for reaching the destination.
