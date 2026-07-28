# 1391. Check if There is a Valid Path in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid)
**Companies:** Google, Robinhood, Samsung
---

## Problem Description
You are given an `m x n` grid where each cell contains a street type numbered from 1 to 6. Each street type has specific open directions (up, down, left, right). Starting from the top‑left cell `(0,0)`, determine whether there exists a valid path to the bottom‑right cell `(m‑1,n‑1)` by moving only through connected street openings.

## Examples
| Grid | Output | Explanation |
|------|--------|-------------|
| `[[2,4,3],[6,5,2]]` | true | A continuous path exists following the street connections.
| `[[1,2,1],[1,2,1]]` | false | No way to reach the bottom‑right cell due to mismatched openings.
| `[[1]]` | true | Single cell is trivially reachable.

## Approach
Treat each cell as a node in a graph. For each cell, enumerate its possible outgoing directions based on its street type. For each direction, check the neighboring cell’s type to see if it has a complementary opening. Perform BFS (or DFS) from `(0,0)` visiting only cells with matching connections. If `(m‑1,n‑1)` is reached, a valid path exists.

```text
FUNCTION hasValidPath(grid):
    SET m ← NUMBER OF ROWS(grid)
    SET n ← NUMBER OF COLUMNS(grid[0])
    DEFINE dirs ← MAP of street type → list of (dx, dy) openings
    INITIALIZE queue ← [(0,0)]
    INITIALIZE visited ← SET {(0,0)}
    WHILE queue NOT EMPTY:
        SET (x, y) ← POP_FRONT(queue)
        IF x = m-1 AND y = n-1:
            RETURN true
        FOR each (dx, dy) IN dirs[grid[x][y]]:
            SET nx ← x + dx
            SET ny ← y + dy
            IF nx < 0 OR ny < 0 OR nx ≥ m OR ny ≥ n:
                CONTINUE
            IF (dx, dy) NOT IN complementary direction of dirs[grid[nx][ny]]:
                CONTINUE
            IF (nx, ny) NOT IN visited:
                ADD (nx, ny) TO visited
                APPEND (nx, ny) TO queue
    RETURN false
```

## Walkthrough
For the grid `[[2,4,3],[6,5,2]]`:
1. Start at `(0,0)` type 2 (right & left). Move right to `(0,1)` type 4 (down & up).
2. From `(0,1)` go down to `(1,1)` type 5 (left & right). Continue following matching openings until reaching `(1,2)` which is the bottom‑right cell.
The BFS explores these cells and returns true.

## Complexity Analysis
*Time*: O(m·n) – each cell is processed at most once.
*Space*: O(m·n) for the visited set and queue.

## Follow-Up Questions
1. How would you modify the algorithm to return the actual path sequence?
2. Can the solution be adapted for weighted streets where each move has a cost?
3. What changes are needed if diagonal moves are allowed for certain street types?

## Key Takeaway
Model the grid as a graph where edges exist only between cells with compatible street openings; a simple BFS determines reachability.
