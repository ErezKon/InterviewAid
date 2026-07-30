# Grid DFS/BFS Pattern Collection

**Difficulty:** 🟢 Easy
**Companies:** N/A

---

## Problem Description
This document aggregates common grid traversal patterns used in LeetCode problems such as counting islands, measuring component size, multi‑source BFS, border DFS, shortest path, and flood fill. Each pattern provides a reusable template for exploring 2‑D grids via depth‑first or breadth‑first search.

## Examples
**Example Pattern – Border DFS (Surrounded Regions #130):**
```
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: board becomes [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: All "O" not connected to the border are flipped to "X".
```

**Example Pattern – Multi‑source BFS (Rotting Oranges #994):**
```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4 (minutes until all oranges rot)
```

## Approach
For each pattern, the core idea is:
1. Identify start cells (all cells, border cells, or multiple sources).
2. Use a visited matrix to avoid revisiting.
3. Apply DFS recursion or BFS queue to explore four directions (up, down, left, right).
4. Perform problem‑specific processing inside the traversal (e.g., counting, flipping, distance update).

### Generic DFS Template
```text
FUNCTION gridDFS(grid, r, c, visited):
    IF r < 0 OR r >= ROWS(grid) OR c < 0 OR c >= COLS(grid): RETURN
    IF visited[r][c] OR grid[r][c] = INVALID: RETURN
    SET visited[r][c] ← true
    // problem‑specific processing here
    gridDFS(grid, r+1, c, visited)
    gridDFS(grid, r-1, c, visited)
    gridDFS(grid, r, c+1, visited)
    gridDFS(grid, r, c-1, visited)
```

### Generic BFS Template
```text
FUNCTION gridBFS(grid, startCells):
    SET queue ← empty
    FOR cell IN startCells:
        ENQUEUE(cell, queue)
        MARK visited[cell] ← true
    WHILE queue NOT EMPTY:
        SET (r, c) ← DEQUEUE(queue)
        // problem‑specific processing here
        FOR (nr, nc) IN [(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
            IF nr, nc inside grid AND NOT visited[nr][nc] AND grid[nr][nc] ≠ INVALID:
                ENQUEUE((nr,nc), queue)
                MARK visited[nr][nc] ← true
```

## Walkthrough
Take the **Border DFS** pattern for Surrounded Regions:
1. Start DFS from all border cells containing "O".
2. Mark visited "O" cells as safe.
3. After DFS, flip any unvisited "O" to "X".
The same structure applies to other problems with minor tweaks.

## Complexity Analysis
- **Time:** O(m · n) where `m` and `n` are grid dimensions, as each cell is visited at most once per traversal.
- **Space:** O(m · n) for the visited matrix (or O(min(m,n)) for recursive stack depth in DFS).

## Follow‑Up Questions
1. How would you adapt these templates for 8‑directional movement?
2. Can you implement the traversal iteratively to avoid recursion limits?
3. How does the choice between DFS and BFS affect the solution for shortest‑path problems?

## Key Takeaway
Standardized DFS/BFS templates simplify grid‑based problems by abstracting traversal mechanics, allowing focus on problem‑specific logic.
