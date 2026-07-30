# 749. Contain Virus

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/contain-virus](https://leetcode.com/problems/contain-virus)
**Companies:** Bloomberg, Flipkart, Google

---

## Problem Description
You are given a 2D grid `grid` of size `m × n` where each cell is either `0` (uninfected) or `1` (infected). Each day, every infected region (connected component of `1`s) spreads to all adjacent uninfected cells (4‑directionally). You may build walls around **exactly one** region per day to prevent it from spreading. The cost is the number of walls built. Return the total number of walls required to eventually stop the virus from spreading.

## Examples
- Input: `grid = [[0,1,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[0,0,0,0,0,0,0,1]]` → Output: `10` (walls built around the most threatening region each day).
- Input: `grid = [[1,1,1],[1,0,1],[1,1,1]]` → Output: `4` (only the central cell can be isolated).

## Approach
**Algorithm:** Simulation with BFS/DFS and greedy region selection (O(m·n·days))
1. Identify all infected regions via BFS/DFS, recording their cells and the set of neighboring uninfected cells they would infect.
2. Choose the region with the largest frontier (most new cells) and build walls around it; add the wall count to the answer and mark its cells as *contained* (value `2`).
3. For all other regions, infect their neighboring uninfected cells.
4. Repeat until no region can spread.

```text
FUNCTION containVirus(grid):
    SET totalWalls ← 0
    WHILE TRUE:
        SET regions ← []
        SET visited ← matrix of FALSE same size as grid
        // 1. Find all infected regions
        FOR i ← 0 TO ROWS(grid)-1:
            FOR j ← 0 TO COLS(grid)-1:
                IF grid[i][j] == 1 AND NOT visited[i][j]:
                    SET regionCells ← []
                    SET frontier ← SET()
                    SET wallsNeeded ← 0
                    CALL bfs(i, j, grid, visited, regionCells, frontier, wallsNeeded)
                    APPEND regions WITH (regionCells, frontier, wallsNeeded)
        IF regions IS EMPTY: BREAK
        // 2. Select region with largest frontier
        SET target ← region WITH MAX SIZE(frontier)
        IF SIZE(target.frontier) == 0: BREAK
        // 3. Build walls around target
        SET totalWalls ← totalWalls + target.wallsNeeded
        FOR each (r,c) IN target.regionCells:
            SET grid[r][c] ← 2  // contained
        // 4. Spread other regions
        FOR each region IN regions EXCEPT target:
            FOR each (r,c) IN region.frontier:
                SET grid[r][c] ← 1
    RETURN totalWalls

FUNCTION bfs(sr, sc, grid, visited, regionCells, frontier, wallsNeeded):
    SET queue ← [(sr, sc)]
    SET visited[sr][sc] ← TRUE
    WHILE queue NOT EMPTY:
        POP (r, c) FROM queue
        APPEND regionCells WITH (r, c)
        FOR each (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            IF nr OUT OF BOUNDS OR nc OUT OF BOUNDS: CONTINUE
            IF grid[nr][nc] == 0:
                ADD (nr, nc) TO frontier
                SET wallsNeeded ← wallsNeeded + 1
            ELSE IF grid[nr][nc] == 1 AND NOT visited[nr][nc]:
                SET visited[nr][nc] ← TRUE
                PUSH (nr, nc) TO queue
``` 

## Walkthrough
Consider the first example grid. Day 1 we identify three infected regions; the leftmost region can infect 5 new cells, the rightmost 3, the middle 2. We wall off the leftmost (cost 5). Remaining regions spread, updating the grid. The process repeats until no frontier exists, accumulating a total of 10 walls.

## Complexity Analysis
- **Time:** O(m·n·D) where D is the number of days; each day scans the grid and performs BFS on each region.
- **Space:** O(m·n) for visited matrix and queues.

## Follow‑Up Questions
- How would the solution change if walls could be built around multiple regions per day?
- Can the algorithm be optimized to avoid full rescans each day?
- How would you adapt the approach for diagonal spreading (8‑directional)?

## Key Takeaway
A greedy simulation that each day walls off the most threatening infected region ensures the minimal total wall count needed to contain the virus.