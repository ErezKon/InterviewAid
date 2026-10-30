# 1778. Shortest Path in a Hidden Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-hidden-grid](https://leetcode.com/problems/shortest-path-in-a-hidden-grid)
**Companies:** Bloomberg, Google, Meta

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

This is an **interactive problem**.

There is a robot in a hidden grid, and you are trying to get it from its starting cell to the target cell in this grid. The grid is of size `m x n`, and each cell in the grid is either empty or blocked. It is **guaranteed** that the starting cell and the target cell are different, and neither of them is blocked.

You want to find the minimum distance to the target cell. However, you **do not know** the grid's dimensions, the starting cell, nor the target cell. You are only allowed to ask queries to the `GridMaster` object.

Thr `GridMaster` class has the following functions:

- `boolean canMove(char direction)` Returns `true` if the robot can move in that direction. Otherwise, it returns `false`.
- `void move(char direction)` Moves the robot in that direction. If this move would move the robot to a blocked cell or off the grid, the move will be **ignored**, and the robot will remain in the same position.
- `boolean isTarget()` Returns `true` if the robot is currently on the target cell. Otherwise, it returns `false`.

Note that `direction` in the above functions should be a character from `{'U','D','L','R'}`, representing the directions up, down, left, and right, respectively.

Return *the **minimum distance** between the robot's initial starting cell and the target cell. If there is no valid path between the cells, return* `-1`.

**Custom testing:**

The test input is read as a 2D matrix `grid` of size `m x n` where:

- `grid[i][j] == -1` indicates that the robot is in cell `(i, j)` (the starting cell).
- `grid[i][j] == 0` indicates that the cell `(i, j)` is blocked.
- `grid[i][j] == 1` indicates that the cell `(i, j)` is empty.
- `grid[i][j] == 2` indicates that the cell `(i, j)` is the target cell.

There is exactly one `-1` and `2` in `grid`. Remember that you will **not** have this information in your code.

**Constraints:**
- `1 <= n, m <= 500`
- `m == grid.length`
- `n == grid[i].length`
- `grid[i][j]` is either `-1`, `0`, `1`, or `2`.
- There is **exactly one** `-1` in `grid`.
- There is **exactly one** `2` in `grid`.

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

**Example 1:**
```
Input: grid = [[1,2],[-1,0]]
Output: 2
Explanation: One possible interaction is described below:
The robot is initially standing on cell (1, 0), denoted by the -1.
- master.canMove('U') returns true.
- master.canMove('D') returns false.
- master.canMove('L') returns false.
- master.canMove('R') returns false.
- master.move('U') moves the robot to the cell (0, 0).
- master.isTarget() returns false.
- master.canMove('U') returns false.
- master.canMove('D') returns true.
- master.canMove('L') returns false.
- master.canMove('R') returns true.
- master.move('R') moves the robot to the cell (0, 1).
- master.isTarget() returns true.
We now know that the target is the cell (0, 1), and the shortest path to the target cell is 2.
```

**Example 2:**
```
Input: grid = [[0,0,-1],[1,1,1],[2,0,0]]
Output: 4
Explanation: The minimum distance between the robot and the target cell is 4.
```

**Example 3:**
```
Input: grid = [[-1,0],[0,2]]
Output: -1
Explanation: There is no path from the robot to the target cell.
```

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
