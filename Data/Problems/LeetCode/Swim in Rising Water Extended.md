# Minimax Path Problems

Related: #778 Swim in Rising Water, #1631 Path With Minimum Effort, #1102 Path With Maximum Minimum Value

---

## Problem Description
Given an `n × n` grid of non‑negative integers representing elevations, you start at the top‑left cell and must reach the bottom‑right cell. At time `t` you can enter any cell with elevation ≤ `t`. The goal is to find the minimum time `t` such that a path exists, i.e., minimize the maximum elevation encountered along the path (min‑max). Variants include minimizing the maximum difference between adjacent cells or maximizing the minimum value along a path.

## Examples
**Example 1 – Swim in Rising Water (#778)**
```
Input: grid = [[0,2],[1,3]]
Output: 3
Explanation: The optimal path 0→1→3 has max elevation 3.
```
**Example 2 – Path With Minimum Effort (#1631)**
```
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: Minimum effort (max diff) along path is 2.
```

## Approach
Use a modified Dijkstra (or BFS with a min‑heap) where the cost of a path is the maximum elevation (or difference) seen so far. The priority queue orders states by this cost, always expanding the currently cheapest (lowest max) frontier.

```text
FUNCTION minimaxPath(grid):
    SET n ← size of grid
    SET target ← (n-1, n-1)
    CREATE minHeap ← [(grid[0][0], 0, 0)]   // (cost, row, col)
    CREATE visited ← empty set
    WHILE minHeap NOT EMPTY:
        SET (cost, r, c) ← POP_MIN(minHeap)
        IF (r, c) = target: RETURN cost
        IF (r, c) IN visited: CONTINUE
        ADD (r, c) TO visited
        FOR each (nr, nc) neighbor of (r, c) within bounds:
            IF (nr, nc) NOT IN visited:
                SET newCost ← MAX(cost, grid[nr][nc])
                PUSH (newCost, nr, nc) INTO minHeap
    RETURN -1
```

## Walkthrough
Consider `grid = [[0,2],[1,3]]`.
| Step | Heap (cost,r,c) | Pop | New pushes | Visited | Current best |
|------|-----------------|-----|------------|---------|--------------|
| 0 | [(0,0,0)] | (0,0,0) | (0,1,0), (2,0,1) | {(0,0)} | 0 |
| 1 | [(0,1,0), (2,0,1)] | (0,1,0) | (1,1,0) | {(0,0),(1,0)} | 0 |
| 2 | [(1,1,0), (2,0,1)] | (1,1,0) | (2,1,1) | {(0,0),(1,0),(1,1)} | 1 |
| 3 | [(2,0,1), (2,1,1)] | (2,0,1) | (3,1,1) | {(0,0),(1,0),(0,1)} | 2 |
| 4 | [(2,1,1), (3,1,1)] | (2,1,1) → target, RETURN 3 |

Result is 3.

## Complexity Analysis
- **Time:** O(n² log n) – each cell may be pushed to the heap once.
- **Space:** O(n²) – heap and visited set.

## Follow‑Up Questions
1. How would you adapt the algorithm to minimize the maximum *difference* between adjacent cells (Path With Minimum Effort)?
2. Can you solve the problem using binary search on the answer combined with BFS/DFS?
3. How does the approach change for a weighted graph where edges have arbitrary costs?

## Key Takeaway
Treat the path cost as the maximum elevation seen so far and use a min‑heap to always expand the currently lowest‑max frontier, yielding an optimal minimax path.
