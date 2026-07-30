# 576. Out of Boundary Paths

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/out-of-boundary-paths](https://leetcode.com/problems/out-of-boundary-paths)
**Companies:** Amazon, Baidu, Bloomberg

---

## Problem Description
Given an `m x n` grid, a ball starts at `(startRow, startColumn)`. You may move the ball up, down, left, or right. After at most `maxMove` moves, count the number of ways the ball can move out of the grid boundary. Return the count modulo `10^9 + 7`.

## Examples
**Example 1:**
```
Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6
Explanation: Six paths lead out of bounds within two moves.
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
