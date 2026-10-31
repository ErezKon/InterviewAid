# 3665. Twisted Mirror Path Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/twisted-mirror-path-count](https://leetcode.com/problems/twisted-mirror-path-count)
**Companies:** Google, Microsoft

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

Given an `m x n` binary grid `grid` where:

- `grid[i][j] == 0` represents an empty cell, and
- `grid[i][j] == 1` represents a mirror.

A robot starts at the top-left corner of the grid `(0, 0)` and wants to reach the bottom-right corner `(m - 1, n - 1)`. It can move only **right** or **down**. If the robot attempts to move into a mirror cell, it is **reflected** before entering that cell:

- If it tries to move **right** into a mirror, it is turned **down** and moved into the cell directly below the mirror.
- If it tries to move **down** into a mirror, it is turned **right** and moved into the cell directly to the right of the mirror.

If this reflection would cause the robot to move outside the `grid` boundaries, the path is considered invalid and should not be counted.

Return the number of unique valid paths from `(0, 0)` to `(m - 1, n - 1)`.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Note**: If a reflection moves the robot into a mirror cell, the robot is immediately reflected again based on the direction it used to enter that mirror: if it entered while moving right, it will be turned down; if it entered while moving down, it will be turned right. This process will continue until either the last cell is reached, the robot moves out of bounds or the robot moves to a non-mirror cell.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 500`
- `grid[i][j]` is either `0` or `1`.
- `grid[0][0] == grid[m - 1][n - 1] == 0`

## Examples

**Example 1:**
```
Input: grid = [[0,1,0],[0,0,1],[1,0,0]]
Output: 5
Explanation:
| Number | Full Path                                               |
|--------|---------------------------------------------------------|
| 1      | (0, 0) → (0, 1) [M] → (1, 1) → (1, 2) [M] → (2, 2)      |
| 2      | (0, 0) → (0, 1) [M] → (1, 1) → (2, 1) → (2, 2)          |
| 3      | (0, 0) → (1, 0) → (1, 1) → (1, 2) [M] → (2, 2)          |
| 4      | (0, 0) → (1, 0) → (1, 1) → (2, 1) → (2, 2)              |
| 5      | (0, 0) → (1, 0) → (2, 0) [M] → (2, 1) → (2, 2)          |
[M] indicates the robot attempted to enter a mirror cell and instead reflected.
```

**Example 2:**
```
Input: grid = [[0,0],[0,0]]
Output: 2
Explanation:
| Number | Full Path                  |
|--------|----------------------------|
| 1      | (0, 0) → (0, 1) → (1, 1)   |
| 2      | (0, 0) → (1, 0) → (1, 1)   |
```

**Example 3:**
```
Input: grid = [[0,1,1],[1,1,0]]
Output: 1
Explanation:
| Number | Full Path                                  |
|--------|--------------------------------------------|
| 1      | (0, 0) → (0, 1) [M] → (1, 1) [M] → (1, 2)  |
(0, 0) → (1, 0) [M] → (1, 1) [M] → (2, 1) goes out of bounds, so it is invalid.
```

## Approach
Track, for every cell, how many ways the robot **enters** it and in which direction, because a mirror's behaviour depends on the entering direction.

- `R[i][j]` = number of ways the robot enters cell `(i, j)` while moving **right**.
- `D[i][j]` = number of ways the robot enters cell `(i, j)` while moving **down**.

Every move (including reflections) goes strictly right or down, so processing cells in row-major order guarantees all contributions to a cell are final before it is processed.

- **Empty cell:** the robot stands here, `t = R + D` ways. It may try to step right (`R[i][j+1] += t`) or down (`D[i+1][j] += t`).
- **Mirror cell:** the robot never stops here. Entering while moving right turns it down (`D[i+1][j] += R[i][j]`); entering while moving down turns it right (`R[i][j+1] += D[i][j]`). Chains of mirrors are handled automatically because the next mirror forwards its counts in the same way.
- Anything pushed outside the grid is simply dropped, which discards invalid paths.

The answer is `R[m-1][n-1] + D[m-1][n-1]` (the target is never a mirror).

```text
FUNCTION uniquePaths(grid):
    MOD ← 10^9 + 7
    R ← (m+1) x (n+1) zeros;  D ← (m+1) x (n+1) zeros   // extra row/col absorbs out-of-bounds
    R[0][0] ← 1
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO n-1:
            IF grid[i][j] = 0:
                t ← (R[i][j] + D[i][j]) MOD MOD
                IF i = m-1 AND j = n-1: RETURN t
                R[i][j+1] ← (R[i][j+1] + t) MOD MOD      // try to move right
                D[i+1][j] ← (D[i+1][j] + t) MOD MOD      // try to move down
            ELSE:                                        // mirror
                D[i+1][j] ← (D[i+1][j] + R[i][j]) MOD MOD   // right -> down
                R[i][j+1] ← (R[i][j+1] + D[i][j]) MOD MOD   // down -> right
```

## Walkthrough
Example 1: `grid = [[0,1,0],[0,0,1],[1,0,0]]`, start `R[0][0] = 1`.

| Cell | Type | Incoming (R, D) | Action |
|------|------|-----------------|--------|
| (0,0) | empty | (1, 0) | t=1 → R[0][1]+=1, D[1][0]+=1 |
| (0,1) | mirror | (1, 0) | right→down: D[1][1]+=1 |
| (0,2) | empty | (0, 0) | t=0, nothing |
| (1,0) | empty | (0, 1) | t=1 → R[1][1]+=1, D[2][0]+=1 |
| (1,1) | empty | (1, 1) | t=2 → R[1][2]+=2, D[2][1]+=2 |
| (1,2) | mirror | (2, 0) | right→down: D[2][2]+=2 |
| (2,0) | mirror | (0, 1) | down→right: R[2][1]+=1 |
| (2,1) | empty | (1, 2) | t=3 → R[2][2]+=3 (down goes out of grid) |
| (2,2) | target | (3, 2) | return 3 + 2 = **5** |

Output: `5`.

## Complexity Analysis
- **Time:** `O(m · n)` — each cell is processed once with O(1) work.
- **Space:** `O(m · n)` for the two tables; can be reduced to `O(n)` by keeping only the current and next row.

## Follow-Up Questions
1. How would you reduce memory to `O(n)`? (Keep `R` for the current row and `D` for the next row only.)
2. What if mirrors could be of two kinds (`/` and `\`) with different reflection rules, possibly sending the robot left or up? (The state graph may contain cycles; you would need a graph traversal / cycle detection instead of a simple ordered DP.)
3. How would you reconstruct one valid path, or the lexicographically smallest one?

## Key Takeaway
When a cell's effect depends on how you enter it, add the entering direction to the DP state. Since every move (even reflections) goes right or down, a single row-major pass that "pushes" counts forward through mirrors counts all valid paths in `O(m · n)`.
