# 934. Shortest Bridge

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-bridge](https://leetcode.com/problems/shortest-bridge)
**Companies:** Amazon, Bytedance, Coupang, Docusign, Flipkart, Goldman Sachs, Google, Mckinsey, Meta, Microsoft, Salesforce, Tesla, Tiktok, Tower Research, Uber

---

## Problem Description

Given a binary grid with exactly two islands, find the minimum number of `0`s to flip to connect them (shortest bridge).

---

## Approach: DFS + BFS — O(n²) ✅

1. DFS to find and mark all cells of island 1.
2. BFS from island 1's border cells. First time we reach island 2 = shortest bridge.

```text
FUNCTION shortestBridge(grid):
    // DFS to find island 1
    found ← FALSE
    queue ← []
    FOR r ← 0 TO ROWS-1:
        FOR c ← 0 TO COLS-1:
            IF grid[r][c] = 1 AND NOT found:
                dfs(r, c, grid, queue)
                found ← TRUE
                BREAK
    // BFS to reach island 2
    steps ← 0
    WHILE queue NOT EMPTY:
        size ← LENGTH(queue)
        FOR i ← 1 TO size:
            (r, c) ← queue.DEQUEUE()
            FOR (nr, nc) IN NEIGHBORS(r, c):
                IF grid[nr][nc] = 1: RETURN steps
                IF grid[nr][nc] = 0:
                    grid[nr][nc] ← 2
                    queue.ENQUEUE((nr, nc))
        steps ← steps + 1
    RETURN -1
```

## Examples

**Example 1:**
```
grid = [[0,1,0],[0,0,0],[0,0,1]]
```
Flip one `0` to connect the islands, answer **1**.

**Example 2:**
```
grid = [[1,1,0,0,0],[1,0,0,0,0],[0,0,0,0,1],[0,0,0,1,1]]
```
Shortest bridge requires flipping **2** zeros.

## Walkthrough

1. Perform DFS from the first `1` found (top‑left island) and mark its cells as `2`. Border cells are added to the BFS queue.
2. Begin BFS level‑by‑level expanding outward from the border.
3. After expanding one layer, we encounter the second island (`1`) → steps = 1 (first example).
4. In the second example, two BFS layers are needed before reaching the opposite island, giving answer 2.

## Complexity Analysis

- **Time:** O(N × M) where N and M are grid dimensions – each cell visited at most twice (DFS + BFS).
- **Space:** O(N × M) for the queue and recursion stack.

## Follow-Up Questions

1. How would you modify the algorithm if there were more than two islands and you needed the shortest bridge between any two?
2. Can the solution be adapted to weighted grids where flipping a `0` has a cost?
3. What is the impact on complexity if the grid is extremely large and cannot fit into memory?

## Key Takeaway

Combine DFS to isolate one island with multi‑source BFS to expand uniformly; the first contact with the second island yields the minimal number of flips.
