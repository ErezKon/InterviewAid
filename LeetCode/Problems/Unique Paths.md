# 62. Unique Paths

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/unique-paths](https://leetcode.com/problems/unique-paths)
**Companies:** Accenture, Akamai, Amazon, Bloomberg, De Shaw, Epam Systems, Flipkart, Goldman Sachs, Google, Grammarly, Linkedin, Meta, Microsoft, Nvidia, Qualcomm, Razorpay, Tcs, Tiktok, Visa, Zoho

---

## 1. Problem Description

A robot starts at the top‑left corner of an `m × n` grid and can only move **right** or **down**. How many distinct paths lead to the bottom‑right corner?

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `m = 3, n = 7` | `28` | 28 different sequences of moves.
| `m = 3, n = 2` | `3` | Paths: DDR, DRD, RDD.
| `m = 1, n = 1` | `1` | Only the starting cell.

---

## 3. Approach: Dynamic Programming — O(m·n)

```text
FUNCTION uniquePaths(m, n):
    // dp[i][j] = number of ways to reach cell (i,j)
    dp ← matrix of size m × n filled with 0
    FOR i ← 0 TO m-1: dp[i][0] ← 1   // first column
    FOR j ← 0 TO n-1: dp[0][j] ← 1   // first row
    FOR i ← 1 TO m-1:
        FOR j ← 1 TO n-1:
            dp[i][j] ← dp[i-1][j] + dp[i][j-1]
    RETURN dp[m-1][n-1]
```

---

## 4. Walkthrough

For `m = 3, n = 3`:
1. Initialize first row and column to 1.
2. Fill cell (1,1): `dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2`.
3. Fill cell (1,2): `dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3`.
4. Continue similarly; final `dp[2][2] = 6` paths.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## 6. Follow‑Up Questions

* **Unique Paths II** – grids with obstacles.
* **Minimum Path Sum** – each cell has a cost.
* **Combinatorial Formula** – `C(m+n-2, m-1)` for O(1) time.

---

## Key Takeaway

> DP on a grid: each cell’s path count equals the sum of paths from the cell above and the cell to the left.
