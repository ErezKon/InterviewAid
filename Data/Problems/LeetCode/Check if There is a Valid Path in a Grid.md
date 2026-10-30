# 1391. Check if There is a Valid Path in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid)
**Companies:** Google, Robinhood, Samsung
---

## Problem Description
You are given an `m x n` `grid`. Each cell of `grid` represents a street. The street of `grid[i][j]` can be:

- `1` which means a street connecting the left cell and the right cell.
- `2` which means a street connecting the upper cell and the lower cell.
- `3` which means a street connecting the left cell and the lower cell.
- `4` which means a street connecting the right cell and the lower cell.
- `5` which means a street connecting the left cell and the upper cell.
- `6` which means a street connecting the right cell and the upper cell.

You will initially start at the street of the upper-left cell `(0, 0)`. A valid path in the grid is a path that starts from the upper left cell `(0, 0)` and ends at the bottom-right cell `(m - 1, n - 1)`. **The path should only follow the streets**.

**Notice** that you are **not allowed** to change any street.

Return `true` *if there is a valid path in the grid or* `false` *otherwise*.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `1 <= grid[i][j] <= 6`

## Examples
```
Example 1:
  Input: grid = [[2,4,3],[6,5,2]]
  Output: true
  Explanation: You can start at cell (0, 0) and visit all the cells of the grid to reach (m - 1, n - 1).
```

```
Example 2:
  Input: grid = [[1,2,1],[1,2,1]]
  Output: false
  Explanation: The street at cell (0, 0) is not connected with any street of any other cell and you will get stuck at cell (0, 0).
```

```
Example 3:
  Input: grid = [[1,1,2]]
  Output: false
  Explanation: You will get stuck at cell (0, 1) and you cannot reach cell (0, 2).
```

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
