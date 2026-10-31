# 1162. As Far from Land as Possible

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/as-far-from-land-as-possible](https://leetcode.com/problems/as-far-from-land-as-possible)
**Companies:** Amazon, Google, Hive, Microsoft, Uipath, Wix

---

## Problem Description
Given an `n x n` `grid` containing only values `0` and `1`, where `0` represents water and `1` represents land, find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or water exists in the grid, return `-1`.

The distance used in this problem is the Manhattan distance: the distance between two cells `(x0, y0)` and `(x1, y1)` is `|x0 - x1| + |y0 - y1|`.

**Constraints:**
- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j]` is `0` or `1`

## Examples
```
Example 1:
  Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
  Output: 2
  Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.
```
```
Example 2:
  Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
  Output: 4
  Explanation: The cell (2, 2) is as far as possible from all the land with distance 4.
```

## Approach
**Multi-source BFS — O(n²)**
Start BFS simultaneously from all land cells. Each BFS layer expands to adjacent water cells, marking them as visited (turning them into land). The number of layers processed equals the maximum distance.

```text
FUNCTION maxDistance(grid):
    n ← LENGTH(grid)
    queue ← []
    FOR r ← 0 TO n-1:
        FOR c ← 0 TO n-1:
            IF grid[r][c] = 1:
                queue.APPEND((r, c))
    IF queue.SIZE = 0 OR queue.SIZE = n*n: RETURN -1
    dist ← 0
    WHILE queue IS NOT EMPTY:
        nextQueue ← []
        FOR (r, c) IN queue:
            FOR (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
                IF 0 ≤ nr < n AND 0 ≤ nc < n AND grid[nr][nc] = 0:
                    grid[nr][nc] ← 1
                    nextQueue.APPEND((nr, nc))
        queue ← nextQueue
        IF queue IS NOT EMPTY: dist ← dist + 1
    RETURN dist
```

## Walkthrough
For the grid `[[1,0,0],[0,0,0],[0,0,0]]`:
1. Initial queue = all land cells → `[(0,0)]`.
2. Layer 1 expands to `(1,0)` and `(0,1)` → `dist = 1`.
3. Layer 2 expands further → `dist = 2`.
4. Continue until the last water cell `(2,2)` is reached at `dist = 4`.
The final `dist` is the answer.

## Complexity Analysis
- **Time:** O(n²) – each cell is visited at most once.
- **Space:** O(n²) for the queue in the worst case.

## Follow-Up Questions
1. How would you modify the algorithm for rectangular grids (`m x n`)?
2. Can you solve the problem using DP without an explicit queue?
3. What if diagonal moves were allowed? How would the distance metric change?

## Key Takeaway
Running a BFS from all land cells simultaneously propagates distances outward, and the number of BFS layers processed directly yields the farthest water distance.