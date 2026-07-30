# 1778. Shortest Path in a Hidden Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-hidden-grid](https://leetcode.com/problems/shortest-path-in-a-hidden-grid)
**Companies:** Bloomberg, Google, Meta

---

## Problem Description

Given a hidden grid accessible only via `GridMaster` API (canMove/move/isTarget), find the shortest path from start to target. You don't know the grid layout upfront.

---

## Approach: DFS Explore + BFS Shortest Path

```text
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

---

## Examples

| Grid (hidden) | Shortest Path Length |
|---------------|----------------------|
| `[[.,.,T],[.,X,.],[S,.,.]]` | 4 |
| `[[S,X,.],[.,.,.],[.,X,T]]`   | 6 |

*Explanation*: The API reveals cells as you move; the algorithm first maps reachable cells then runs BFS to reach `T`.

---

## Walkthrough

1. **DFS Exploration** – Starting at `(0,0)`, recursively move in all possible directions, marking visited cells and recording the target when found.
2. **Backtracking** – After exploring a branch, move back to the previous cell using the opposite direction to continue exploring other branches.
3. **Adjacency Map** – The DFS builds a graph where each node is a reachable coordinate and edges represent possible moves.
4. **BFS Shortest Path** – With the full graph, perform a standard BFS from the start node to the recorded target node to obtain the minimal number of moves.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n) – DFS explores each cell once, BFS traverses the built graph. | O(m·n) – Stores visited cells and adjacency list. |

---

## Follow-Up Questions

* How would you modify the solution if the grid size is unknown and potentially infinite?
* Can you adapt the algorithm to return the actual path sequence, not just its length?
* What changes are needed if some cells become blocked after being visited?

---

## Key Takeaway

> Two-phase approach: **DFS to explore** the hidden grid and map it, then **BFS on the mapped grid** for shortest path. Backtracking during DFS is essential.
