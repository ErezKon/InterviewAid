# 1810. Minimum Path Cost in a Hidden Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-path-cost-in-a-hidden-grid](https://leetcode.com/problems/minimum-path-cost-in-a-hidden-grid)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DFS Explore + Dijkstra — O(mn log(mn))](#4-approach-dfs-explore--dijkstra)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are in a hidden grid with weighted cells. You can interact via a `GridMaster` API:
- `canMove(direction)` — returns if you can move in that direction
- `move(direction)` — moves and returns the cell cost
- `isTarget()` — returns if current cell is the target

Find the **minimum cost path** from start to target. Return `-1` if unreachable.

**Constraints:**
- Grid size up to `100 × 100`
- Cell costs in `[1, 100]`

---

## 2. Examples

```
Example 1:
  Hidden grid with start at (0,0), target at (2,2)
  DFS explores the grid, then Dijkstra finds shortest path.

Example 2:
  Target unreachable → return -1.
```

---

## 3. Key Insight

> **Two-phase approach**: (1) DFS to explore and map the entire hidden grid, recording cell costs. (2) Run Dijkstra on the discovered graph to find the shortest path from start to target.

---

## 4. Approach: DFS Explore + Dijkstra — O(mn log(mn)) ✅

```
FUNCTION findShortestPath(master):
    grid = {}  // (r,c) → cost
    target = None

    // Phase 1: DFS exploration
    FUNCTION dfs(r, c):
        IF (r,c) IN grid: RETURN
        grid[(r,c)] = current cost
        IF master.isTarget(): target = (r,c)

        FOR each direction d:
            IF master.canMove(d):
                cost = master.move(d)
                grid[(nr,nc)] = cost
                dfs(nr, nc)
                master.move(opposite(d))  // backtrack

    dfs(0, 0)  // start position

    IF target IS None: RETURN -1

    // Phase 2: Dijkstra from (0,0) to target
    RETURN Dijkstra(grid, (0,0), target)
```

---

## 5. Walkthrough

```
Phase 1 — DFS from (0,0):
  Move right → discover (0,1) with cost 3
  Move down → discover (1,1) with cost 2
  ... continue until all reachable cells explored
  Found target at (2,2)

Phase 2 — Dijkstra:
  Start: (0,0) with cost grid[(0,0)]
  Relax neighbors using discovered costs
  Return minimum cost to reach target
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(mn log(mn)) — DFS is O(mn), Dijkstra is O(mn log(mn)) |
| **Space** | O(mn) — storing the grid map |

---

## 7. Follow-Up Questions

**Q1: Why DFS before Dijkstra?**
The grid is hidden — we can only discover it through the API. DFS maps the entire reachable area. Then Dijkstra finds the optimal path on the mapped graph.

**Q2: Why not BFS in phase 1?**
DFS with backtracking is natural here because `move()` physically moves us. We need to backtrack to explore other directions, which DFS handles cleanly.

**Q3: Could we combine exploration and shortest path?**
Not easily — we might need to revisit cells via different paths during exploration, but the API moves us physically.

---

## 8. Key Takeaway

> **Hidden grid = explore first, optimize second.** DFS with backtracking maps the graph, then Dijkstra finds the shortest path. This two-phase pattern applies whenever the graph structure is unknown upfront.
