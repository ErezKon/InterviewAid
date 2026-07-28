# 1162. As Far from Land as Possible

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/as-far-from-land-as-possible](https://leetcode.com/problems/as-far-from-land-as-possible)
**Companies:** Amazon, Google, Hive, Microsoft, Uipath, Wix

---

## Problem Description
Given an `n x n` grid where `grid[i][j] = 1` represents land and `0` represents water, return the maximum distance from any water cell to the nearest land cell. Distance is measured in Manhattan distance. If the grid contains only land or only water, return `-1`.

## Examples
**Example 1:**
```
Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
Output: 2
Explanation: The cell (1,1) is the farthest from any land with distance 2.
```

**Example 2:**
```
Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
Output: 4
Explanation: The bottom‑right corner is farthest, distance 4.
```

## Approach
**Multi‑source BFS — O(n²)**
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

## Follow‑Up Questions
1. How would you modify the algorithm for rectangular grids (`m x n`)?
2. Can you solve the problem using DP without an explicit queue?
3. What if diagonal moves were allowed? How would the distance metric change?

## Key Takeaway
Running a BFS from all land cells simultaneously propagates distances outward, and the number of BFS layers processed directly yields the farthest water distance.