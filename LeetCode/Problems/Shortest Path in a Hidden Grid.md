# 1778. Shortest Path in a Hidden Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-hidden-grid](https://leetcode.com/problems/shortest-path-in-a-hidden-grid)
**Companies:** Bloomberg, Google, Meta

---

## Problem Description

Given a hidden grid accessible only via `GridMaster` API (canMove/move/isTarget), find the shortest path from start to target. You don't know the grid layout upfront.

---

## Approach: DFS Explore + BFS Shortest Path

```
FUNCTION findShortestPath(master):
    // Phase 1: DFS to explore entire grid, build adjacency map
    grid ← {}
    targetPos ← null
    FUNCTION dfs(r, c):
        grid[(r,c)] ← true
        FOR dir IN [U, D, L, R]:
            IF master.canMove(dir):
                nr, nc ← new position
                IF (nr, nc) NOT IN grid:
                    master.move(dir)
                    IF master.isTarget(): targetPos ← (nr, nc)
                    dfs(nr, nc)
                    master.move(opposite(dir))  // backtrack
    dfs(0, 0)

    // Phase 2: BFS on explored grid from (0,0) to targetPos
    RETURN BFS(grid, (0,0), targetPos)
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Key Takeaway

> Two-phase approach: **DFS to explore** the hidden grid and map it, then **BFS on the mapped grid** for shortest path. Backtracking during DFS is essential.
