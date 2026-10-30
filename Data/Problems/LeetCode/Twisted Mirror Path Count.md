# 3665. Twisted Mirror Path Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/twisted-mirror-path-count](https://leetcode.com/problems/twisted-mirror-path-count)
**Companies:** Google, Microsoft

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented "path invariant under a mirror transform" problem. Correct idea: DP with direction — `f[i][j][d]` = number of ways to stand on cell `(i, j)` having arrived moving in direction `d` (right/down). From an empty cell you may step right or down; stepping into a mirror forces a turn (right → down, down → right) and the robot keeps bouncing through consecutive mirrors. Process cells in increasing `i + j`; answer = `Σ_d f[m−1][n−1][d]` mod 10⁹+7. O(m·n).*

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
1. Pre‑compute the mirror of each cell.
2. Use dynamic programming where `dp[i][j]` stores the number of symmetric paths to cell `(i,j)`.
3. Transition: a path to `(i,j)` can come from `(i-1,j)` (down) or `(i,j-1)` (right) **only if** the character at `(i,j)` equals the mirror of the character at the symmetric counterpart `(j,i)`.
4. The answer is `dp[n-1][n-1]`.

## Walkthrough
| Cell (i,j) | Char | Mirror of counterpart (j,i) | Condition | dp[i][j] |
|------------|------|----------------------------|-----------|----------|
| (0,0) | `\` | mirror(`\`) = `/` (at (0,0) itself) → not equal → dp=0 (base case set to 1 if self‑mirror) |
| ... | ... | ... | ... | ... |
(Full table omitted for brevity.)

## Complexity Analysis
- **Time:** `O(n^2)` to fill the DP table.
- **Space:** `O(n^2)` or `O(n)` if we keep only the previous row.

## Follow‑Up Questions
1. How would the solution change if moves could also go left/up?
2. Can the algorithm be adapted for larger alphabets with custom mirror maps?
3. What is the impact on complexity if we need to list all such paths instead of counting them?

## Key Takeaway
By enforcing that each visited cell matches the mirror of its transposed counterpart, a simple DP over the grid counts only those paths invariant under the twisted mirror operation.
