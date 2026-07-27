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

```
FUNCTION shortestBridge(grid):
    // DFS to find island 1
    found = false
    queue = []
    FOR r, c:
        IF grid[r][c] == 1 AND NOT found:
            dfs(r, c, grid, queue)  // marks cells as 2, adds border to queue
            found = true
            BREAK

    // BFS to reach island 2
    steps = 0
    WHILE queue:
        FOR each cell in current level:
            FOR neighbor:
                IF grid[nr][nc] == 1: RETURN steps
                IF grid[nr][nc] == 0:
                    grid[nr][nc] = 2
                    queue.ENQUEUE((nr, nc))
        steps += 1

    RETURN -1
```
