# 361. Bomb Enemy

**Difficulty:** 🟡 Medium

**Companies:** Google, Uber
---

## Problem Description
Given a 2D grid of characters where `'W'` represents a wall, `'E'` an enemy, and `'0'` an empty cell, you may place a bomb on any empty cell. The bomb kills all enemies in the same row and column until a wall blocks the blast. Return the maximum number of enemies that can be killed with a single bomb.

## Examples
**Example 1**
```
Input: grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
Output: 3
Explanation: Placing a bomb at grid[1][1] kills three enemies.
```
**Example 2**
```
Input: grid = [["W","W"],["0","0"]]
Output: 0
Explanation: No enemies can be killed.
```

## Approach
Use row and column caches to store the number of enemies that can be killed from each direction until a wall is encountered. Reset the cache when a wall is hit and reuse it for subsequent empty cells in the same row or column.

### Pseudocode
```text
FUNCTION maxKilledEnemies(grid):
    IF grid IS EMPTY: RETURN 0
    rows ← number of rows in grid
    cols ← number of columns in grid
    maxKill ← 0
    rowCount ← 0
    colCounts ← ARRAY[cols] INITIALIZED TO 0
    FOR i ← 0 TO rows - 1:
        FOR j ← 0 TO cols - 1:
            IF j == 0 OR grid[i][j-1] == 'W':
                // recompute enemies in current row segment
                rowCount ← 0
                k ← j
                WHILE k < cols AND grid[i][k] != 'W':
                    IF grid[i][k] == 'E':
                        rowCount ← rowCount + 1
                    k ← k + 1
            IF i == 0 OR grid[i-1][j] == 'W':
                // recompute enemies in current column segment
                colCounts[j] ← 0
                k ← i
                WHILE k < rows AND grid[k][j] != 'W':
                    IF grid[k][j] == 'E':
                        colCounts[j] ← colCounts[j] + 1
                    k ← k + 1
            IF grid[i][j] == '0':
                total ← rowCount + colCounts[j]
                maxKill ← MAX(maxKill, total)
    RETURN maxKill
```

## Walkthrough
| Step | Cell (i,j) | Action | rowCount | colCounts[j] | maxKill |
|------|------------|--------|----------|--------------|---------|
| 1 | (0,0) | Wall → reset rowCount, colCounts[0] | 0 | 0 | 0 |
| 2 | (0,1) | Empty → total = rowCount(0) + colCounts[1](0) | 0 | 0 | 0 |
| ... | ... | ... | ... | ... | ... |
| Final | (1,1) | Empty → total = 2 (row) + 1 (col) | 2 | 1 | 3 |

## Complexity Analysis
- **Time:** O(m × n), each cell is visited a constant number of times.
- **Space:** O(n) for the column cache.

## Follow-Up Questions
1. How would you modify the solution to return the coordinates of the optimal bomb placement?
2. Can the algorithm be adapted for a 3‑D grid?
3. What if the bomb could also travel diagonally until blocked?

## Key Takeaway
Caching enemy counts for each row and column segment allows a single pass O(m × n) solution without recomputing counts for every empty cell.
