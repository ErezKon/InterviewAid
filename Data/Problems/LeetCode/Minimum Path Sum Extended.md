# Grid DP Patterns

---

## Problem Description
Grid dynamic programming problems share a common structure: compute an optimal value for each cell based on previously computed neighboring cells. The direction of iteration (forward from top‑left or reverse from bottom‑right) and the aggregation operation (min, max, sum, count) define the specific variant, such as unique paths, minimum path sum, or dungeon game.

## Examples

**Example 1 – Minimum Path Sum (#64):**
```
grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7   // path 1→3→1→1→1
```

**Example 2 – Dungeon Game (#174):**
```
grid = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7   // minimum initial health needed
```

## Approach
The generic DP template iterates over the grid, filling `dp[i][j]` from reachable predecessors. For forward DP the predecessors are the cells above and to the left; for reverse DP they are below and to the right. The transition combines the current cell value with the optimal predecessor value using the problem‑specific operation.

```text
FUNCTION gridDP(grid, mode):
    m ← ROW_COUNT(grid)
    n ← COL_COUNT(grid)
    dp ← MATRIX(m, n)
    IF mode = "forward":
        FOR i ← 0 TO m-1:
            FOR j ← 0 TO n-1:
                IF i = 0 AND j = 0:
                    dp[i][j] ← grid[i][j]
                ELSE:
                    best ← INF   // or -INF / 0 depending on operation
                    IF i > 0: best ← COMBINE(best, dp[i-1][j])
                    IF j > 0: best ← COMBINE(best, dp[i][j-1])
                    dp[i][j] ← APPLY(grid[i][j], best)
    ELSE IF mode = "reverse":
        FOR i ← m-1 DOWNTO 0:
            FOR j ← n-1 DOWNTO 0:
                IF i = m-1 AND j = n-1:
                    dp[i][j] ← grid[i][j]
                ELSE:
                    best ← INF
                    IF i < m-1: best ← COMBINE(best, dp[i+1][j])
                    IF j < n-1: best ← COMBINE(best, dp[i][j+1])
                    dp[i][j] ← APPLY(grid[i][j], best)
    RETURN dp[m-1][n-1]   // or dp[0][0] for reverse mode
```
`COMBINE` and `APPLY` are instantiated per problem (e.g., `MIN`/`+` for min‑path, `MAX`/`+` for max‑path, `SUM` for counting paths).

## Walkthrough
Consider the Minimum Path Sum example.
1. Initialize `dp[0][0] = 1`.
2. Fill first row: `dp[0][1] = 1+3 = 4`, `dp[0][2] = 4+1 = 5`.
3. Fill first column: `dp[1][0] = 1+1 = 2`, `dp[2][0] = 2+4 = 6`.
4. For cell (1,1): `best = MIN(dp[0][1], dp[1][0]) = MIN(4,2) = 2`; `dp[1][1] = 5 + 2 = 7`.
5. Continue similarly; final `dp[2][2] = 7`.
The same template with `mode="reverse"` solves Dungeon Game by propagating required health backwards.

## Complexity Analysis
- **Time:** O(m·n) – each cell processed once.
- **Space:** O(m·n) for the DP matrix, reducible to O(n) by keeping only the previous row/column.

## Follow-Up Questions
1. How can you modify the template to handle obstacles that block movement?
2. What changes are needed for diagonal moves or knight‑like jumps?
3. Can you extend the approach to 3‑D grids or irregular graphs?

## Key Takeaway
All grid‑based DP problems reduce to a single template: iterate in the appropriate direction, combine optimal predecessor values, and apply the problem‑specific operation.
