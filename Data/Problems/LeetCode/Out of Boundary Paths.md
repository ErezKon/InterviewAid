# 576. Out of Boundary Paths

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/out-of-boundary-paths](https://leetcode.com/problems/out-of-boundary-paths)
**Companies:** Amazon, Baidu, Bloomberg

---

## Problem Description

There is an `m x n` grid with a ball. The ball is initially at the position `[startRow, startColumn]`. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply **at most** `maxMove` moves to the ball.

Given the five integers `m`, `n`, `maxMove`, `startRow`, `startColumn`, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= m, n <= 50`
- `0 <= maxMove <= 50`
- `0 <= startRow < m`
- `0 <= startColumn < n`

## Examples

**Example 1:**
```
Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6
```

**Example 2:**
```
Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
Output: 12
```

## Approach
Use dynamic programming. `dp[r][c]` stores the number of ways to reach cell `(r,c)` after the current number of moves. For each move, distribute the counts to the four neighboring cells; if a neighbor is out of bounds, add its count to the answer.

## Walkthrough
| Move | Cell (r,c) | Ways before | Out‑of‑bounds contributions |
|------|------------|-------------|-----------------------------|
| 1    | (0,0)      | 1           | 2 (up, left)                |
| 1    | (0,1)      | 0           | 1 (up)                      |
| ...  | ...        | ...         | ...                         |

## Complexity Analysis
- **Time:** O(maxMove × m × n) – we iterate over the grid for each move.
- **Space:** O(m × n) for the DP tables.

## Follow-Up Questions
1. How would you modify the solution for a toroidal grid (wrap‑around edges)?
2. Can the DP be optimized to use O(n) space by reusing rows?
3. What changes if diagonal moves are also allowed?

## Key Takeaway
Iteratively propagating counts with DP across moves efficiently counts all exit paths while handling large `maxMove` values via modular arithmetic.
