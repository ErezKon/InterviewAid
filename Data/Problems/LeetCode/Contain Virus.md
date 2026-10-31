# 749. Contain Virus

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/contain-virus](https://leetcode.com/problems/contain-virus)
**Companies:** Bloomberg, Flipkart, Google

---

## Problem Description
A virus is spreading rapidly, and your task is to quarantine the infected area by installing walls.

The world is modeled as an `m x n` binary grid `isInfected`, where `isInfected[i][j] == 0` represents uninfected cells, and `isInfected[i][j] == 1` represents cells contaminated with the virus. A wall (and only one wall) can be installed between any two **4-directionally** adjacent cells, on the shared boundary.

Every night, the virus spreads to all neighboring cells in all four directions unless blocked by a wall. Resources are limited. Each day, you can install walls around only one region (i.e., the affected area (continuous block of infected cells) that threatens the most uninfected cells the following night). There **will never be a tie**.

Return *the number of walls used to quarantine all the infected regions*. If the world will become fully infected, return the number of walls used.

**Constraints:**
- `m == isInfected.length`
- `n == isInfected[i].length`
- `1 <= m, n <= 50`
- `isInfected[i][j]` is either `0` or `1`.
- There is always a contiguous viral region throughout the described process that will **infect strictly more uncontaminated squares** in the next round.

## Examples
```
Example 1:
  Input: isInfected = [[0,1,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]]
  Output: 10
  Explanation: There are 2 contaminated regions.
    On the first day, add 5 walls to quarantine the viral region on the left. The board after the virus spreads is:
      [[0,1,0,0,0,0,1,1],
       [0,1,0,0,0,0,1,1],
       [0,0,0,0,0,0,1,1],
       [0,0,0,0,0,0,0,1]]
    On the second day, add 5 walls to quarantine the viral region on the right. The virus is fully contained.
```
```
Example 2:
  Input: isInfected = [[1,1,1],[1,0,1],[1,1,1]]
  Output: 4
  Explanation: Even though there is only one cell saved, there are 4 walls built.
    Notice that walls are only built on the shared boundary of two different cells.
```
```
Example 3:
  Input: isInfected = [[1,1,1,0,0,0,0,0,0],[1,0,1,0,1,1,1,1,1],[1,1,1,0,0,0,0,0,0]]
  Output: 13
  Explanation: The region on the left only builds two new walls.
```

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
Consider the first example grid. Day 1 we identify three infected regions; the leftmost region can infect 5 new cells, the rightmost 3, the middle 2. We wall off the leftmost (cost 5). Remaining regions spread, updating the grid. The process repeats until no frontier exists, accumulating a total of 10 walls.

## Complexity Analysis
- **Time:** O(m·n·D) where D is the number of days; each day scans the grid and performs BFS on each region.
- **Space:** O(m·n) for visited matrix and queues.

## Follow-Up Questions
- How would the solution change if walls could be built around multiple regions per day?
- Can the algorithm be optimized to avoid full rescans each day?
- How would you adapt the approach for diagonal spreading (8-directional)?

## Key Takeaway
A greedy simulation that each day walls off the most threatening infected region ensures the minimal total wall count needed to contain the virus.