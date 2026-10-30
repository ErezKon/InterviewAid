# 3797. Count Routes to Climb a Rectangular Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-routes-to-climb-a-rectangular-grid](https://leetcode.com/problems/count-routes-to-climb-a-rectangular-grid)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach/Walkthrough below were written for an older, vague description (corner-to-corner path counting via binomial coefficient) and do not solve this problem. Correct idea: row-by-row DP from the bottom row with two arrays per row — `A[c]` = routes arriving at `(r, c)` by a vertical move (or starting there, `A[c] = 1` in row `n - 1`), `B[c]` = routes arriving by a same-row move. `B[c] = Σ A[c']` over available `c' ≠ c` with `|c - c'| ≤ d`; moving up to row `r - 1` gives `A'[c] = Σ (A[c'] + B[c'])` over `|c - c'| ≤ ⌊sqrt(d² - 1)⌋`. Use prefix sums for O(n·m); the answer is `Σ (A[c] + B[c])` over the top row.*

You are given a string array `grid` of size `n`, where each string `grid[i]` has length `m`. The character `grid[i][j]` is one of the following symbols:

- `'.'`: The cell is available.
- `'#'`: The cell is blocked.

You want to count the number of different routes to climb `grid`. Each route must start from *any cell* in the bottom row (row `n - 1`) and end in the top row (row 0).

However, there are some constraints on the route.

- You can only move from one available cell to **another** available cell.
- The **Euclidean distance** of each move is **at most** `d`, where `d` is an integer parameter given to you. The Euclidean distance between two cells `(r1, c1)`, `(r2, c2)` is `sqrt((r1 - r2)^2 + (c1 - c2)^2)`.
- Each move either stays on the same row or moves to the row directly above (from row `r` to `r - 1`).
- You cannot stay on the same row for two consecutive turns. If you stay on the same row in a move (and this move is not the last move), your next move must go to the row above.

Return an integer denoting the number of such routes. Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n == grid.length <= 750`
- `1 <= m == grid[i].length <= 750`
- `grid[i][j]` is `'.'` or `'#'`.
- `1 <= d <= 750`

---

## Examples

**Example 1:**
```
Input: grid = ["..","#."], d = 1
Output: 2
Explanation: We label the cells we visit in the routes sequentially, starting from 1. The two routes are:
.2
#1
32
#1
We can move from the cell (1, 1) to the cell (0, 1) because the Euclidean distance is sqrt((1 - 0)^2 + (1 - 1)^2) = sqrt(1) <= d.
However, we cannot move from the cell (1, 1) to the cell (0, 0) because the Euclidean distance is sqrt((1 - 0)^2 + (1 - 0)^2) = sqrt(2) > d.
```

**Example 2:**
```
Input: grid = ["..","#."], d = 2
Output: 4
Explanation: Two of the routes are given in example 1. The other two routes are:
2.
#1
23
#1
Note that we can move from (1, 1) to (0, 0) because the Euclidean distance is sqrt(2) <= d.
```

**Example 3:**
```
Input: grid = ["#"], d = 750
Output: 0
Explanation: We cannot choose any cell as the starting cell. Therefore, there are no routes.
```

**Example 4:**
```
Input: grid = [".."], d = 1
Output: 4
Explanation: The possible routes are:
.1
1.
12
21
```

---

## Key Insight

This is a grid path‑counting problem. Depending on the allowed moves, it may reduce to combinatorics (choosing right vs. up moves) or require DP if moves are non‑standard. For a standard right/up grid, the answer is `C(m+n-2, m-1)`.

---

## Approach

```text
FUNCTION countRoutes(m, n):
    MOD ← 10^9 + 7
    // If only right and up moves are allowed, use combinatorial formula
    RETURN binomialCoefficient(m + n - 2, m - 1) MOD MOD

    // For more complex move sets, use DP:
    // dp[r][c] = number of ways to reach cell (r, c)
    // dp[0][0] ← 1
    // FOR r ← 0 TO m-1:
    //     FOR c ← 0 TO n-1:
    //         IF (r, c) is not start:
    //             dp[r][c] ← sum of dp[prev] for all valid previous cells
    // RETURN dp[m-1][n-1] MOD MOD
```

---

## Walkthrough

Consider **Example 1** with `m = 2` and `n = 3`.

| Step | Position (row, col) | Moves taken | Ways to reach |
|------|---------------------|-------------|---------------|
| 1    | (0,0)               | –           | 1             |
| 2    | (0,1)               | Right       | 1             |
| 3    | (0,2)               | Right       | 1             |
| 4    | (1,2)               | Up          | 1             |
| 5    | (1,1)               | Up then Right| 1            |
| 6    | (1,0)               | Right then Up| 1            |

All three distinct sequences (RRU, RUR, URR) are captured, giving the output `3`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for combinatorial formula, O(m × n) for DP |
| **Space** | O(1) for formula, O(n) with row‑wise DP |

---

## Follow-Up Questions

1. How would the solution change if diagonal moves are also allowed?
2. What if certain cells are blocked and cannot be visited?
3. Can the problem be extended to 3‑dimensional grids?

---

## Key Takeaway

> **Grid path counting with restricted moves is either a combinatorial formula (for right/up only) or standard DP (for complex move sets). Always check if the problem reduces to a binomial coefficient first.**