# 2510. Check if There is a Path With Equal Number of 0's And 1's

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-path-with-equal-number-of-0s-and-1s](https://leetcode.com/problems/check-if-there-is-a-path-with-equal-number-of-0s-and-1s)
**Companies:** Google

---

## 1. Problem Description

You are given a **0-indexed** `m x n` **binary** matrix `grid`. You can move from a cell `(row, col)` to any of the cells `(row + 1, col)` or `(row, col + 1)`.

Return `true` *if there is a path from* `(0, 0)` *to* `(m - 1, n - 1)` *that visits an **equal** number of* `0`*'s and* `1`*'s*. Otherwise return `false`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 100`
- `grid[i][j]` is either `0` or `1`.

---

## 2. Key Insight

> Path length is `m + n - 1`, so it must be even for equal counts. Track the difference (count of 1s minus count of 0s) using DP. Replace 0 with -1 and check if path sum = 0.

---

## 3. Approach: DP with Balance Tracking — O(m × n × (m+n)) ✅

```text
FUNCTION hasEqualPath(grid):
    m, n = dimensions of grid
    IF (m + n - 1) % 2 != 0: RETURN false
    
    // dp[r][c] = set of achievable balances at (r,c)
    // balance = sum of (+1 for 1, -1 for 0) along path
    val = lambda r,c: 1 if grid[r][c] == 1 else -1
    
    dp = 2-D array of sets
    dp[0][0] = {val(0,0)}
    
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            IF (r,c) == (0,0): CONTINUE
            dp[r][c] = set()
            IF r > 0:
                FOR b IN dp[r-1][c]: dp[r][c].ADD(b + val(r,c))
            IF c > 0:
                FOR b IN dp[r][c-1]: dp[r][c].ADD(b + val(r,c))
    
    RETURN 0 IN dp[m-1][n-1]
```

| Time | Space |
|------|-------|
| O(m × n × (m+n)) | O(m × n × (m+n)) |

---

## 4. Examples

```
Example 1:
  Input: grid = [[0,1,0,0],[0,1,0,0],[1,0,1,0]]
  Output: true
  Explanation: The path (0,0) → (0,1) → (1,1) → (2,1) → (2,2) → (2,3) visits values [0,1,1,0,1,0],
  so it has 3 cells with a value of 1 and 3 with a value of 0. Since there is a valid path, we return true.
```

```
Example 2:
  Input: grid = [[1,1,0],[0,0,1],[1,0,0]]
  Output: false
  Explanation: There is no path in this grid with an equal number of 0's and 1's.
```

---

## 5. Walkthrough

Consider Example 2 (`m=2, n=3`).
| Cell | Value (±1) | Balances from top | Balances from left | Union → dp[cell] |
|------|------------|-------------------|--------------------|-----------------|
| (0,0) | -1 | – | – | {-1} |
| (0,1) | -1 | – | {-1} → {-2} | {-2} |
| (0,2) | +1 | – | {-2} → {-1} | {-1} |
| (1,0) | +1 | {-1} → {0} | – | {0} |
| (1,1) | +1 | {-2} → {-1} | {0} → {1} | {-1,1} |
| (1,2) | -1 | {-1} → {-2} | {-1,1} → {-2,0} | {-2,0} |
The bottom-right cell `(1,2)` contains balance `0`, so a path with equal 0s and 1s exists.

---

## 6. Complexity Analysis

- **Time:** For each cell we iterate over at most `m+n` possible balances → `O(m·n·(m+n))`.
- **Space:** Storing a set of balances for each cell → `O(m·n·(m+n))`.

---

## Key Takeaway

> Replace 0 → -1 and search for a path whose sum equals 0. DP tracks all achievable balance values at each cell, and the existence of balance 0 at the destination answers the problem.
