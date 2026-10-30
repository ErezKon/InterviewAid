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

> *Note: premium problem — statement verified via doocs/leetcode.*

This is an **interactive problem**.

There is a robot in a hidden grid, and you are trying to get it from its starting cell to the target cell in this grid. The grid is of size `m x n`, and each cell in the grid is either empty or blocked. It is **guaranteed** that the starting cell and the target cell are different, and neither of them is blocked.

Each cell has a **cost** that you need to pay each time you **move** to the cell. The starting cell's cost is **not** applied before the robot moves.

You want to find the minimum total cost to move the robot to the target cell. However, you **do not know** the grid's dimensions, the starting cell, nor the target cell. You are only allowed to ask queries to the `GridMaster` object.

The `GridMaster` class has the following functions:

- `boolean canMove(char direction)` Returns `true` if the robot can move in that direction. Otherwise, it returns `false`.
- `int move(char direction)` Moves the robot in that direction and returns the cost of moving to that cell. If this move would move the robot to a blocked cell or off the grid, the move will be **ignored**, the robot will remain in the same position, and the function will return `-1`.
- `boolean isTarget()` Returns `true` if the robot is currently on the target cell. Otherwise, it returns `false`.

Note that `direction` in the above functions should be a character from `{'U','D','L','R'}`, representing the directions up, down, left, and right, respectively.

Return *the **minimum total cost** to get the robot from its initial starting cell to the target cell. If there is no valid path between the cells, return *`-1`.

**Custom testing:**

The test input is read as a 2D matrix `grid` of size `m x n` and four integers `r1`, `c1`, `r2`, and `c2` where:

- `grid[i][j] == 0` indicates that the cell `(i, j)` is blocked.
- `grid[i][j] >= 1` indicates that the cell `(i, j)` is empty and `grid[i][j]` is the **cost** to move to that cell.
- `(r1, c1)` is the starting cell of the robot.
- `(r2, c2)` is the target cell of the robot.

Remember that you will **not** have this information in your code.

**Constraints:**
- `1 <= n, m <= 100`
- `m == grid.length`
- `n == grid[i].length`
- `0 <= grid[i][j] <= 100`

---

## 2. Examples

**Example 1:**
```
Input: grid = [[2,3],[1,1]], r1 = 0, c1 = 1, r2 = 1, c2 = 0
Output: 2
Explanation: One possible interaction is described below:
The robot is initially standing on cell (0, 1), denoted by the 3.
- master.canMove('U') returns false.
- master.canMove('D') returns true.
- master.canMove('L') returns true.
- master.canMove('R') returns false.
- master.move('L') moves the robot to the cell (0, 0) and returns 2.
- master.isTarget() returns false.
- master.canMove('U') returns false.
- master.canMove('D') returns true.
- master.canMove('L') returns false.
- master.canMove('R') returns true.
- master.move('D') moves the robot to the cell (1, 0) and returns 1.
- master.isTarget() returns true.
- master.move('L') doesn't move the robot and returns -1.
- master.move('R') moves the robot to the cell (1, 1) and returns 1.
We now know that the target is the cell (1, 0), and the minimum total cost to reach it is 2.
```

**Example 2:**
```
Input: grid = [[0,3,1],[3,4,2],[1,2,0]], r1 = 2, c1 = 0, r2 = 0, c2 = 2
Output: 9
Explanation: The minimum cost path is (2,0) -> (2,1) -> (1,1) -> (1,2) -> (0,2).
```

**Example 3:**
```
Input: grid = [[1,0],[0,1]], r1 = 0, c1 = 0, r2 = 1, c2 = 1
Output: -1
Explanation: There is no path from the robot to the target cell.
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
