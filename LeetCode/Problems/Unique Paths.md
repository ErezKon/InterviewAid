# 62. Unique Paths

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/unique-paths](https://leetcode.com/problems/unique-paths)
**Companies:** Accenture, Akamai, Amazon, Bloomberg, De Shaw, Epam Systems, Flipkart, Goldman Sachs, Google, Grammarly, Linkedin, Meta, Microsoft, Nvidia, Qualcomm, Razorpay, Tcs, Tiktok, Visa, Zoho

---

## 1. Problem Description

A robot is at the top-left corner of an `m x n` grid. It can only move **right** or **down**. How many unique paths exist to reach the bottom-right corner?

---

## 2. Approach 1: DP — O(m·n) ✅

```
FUNCTION uniquePaths(m, n):
    dp = m × n matrix
    // First row and column are all 1 (only one way to reach them)
    FOR i ← 0 TO m-1: dp[i][0] = 1
    FOR j ← 0 TO n-1: dp[0][j] = 1

    FOR i ← 1 TO m-1:
        FOR j ← 1 TO n-1:
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    RETURN dp[m-1][n-1]
```

Space optimized to O(n) using a single row.

---

## 3. Approach 2: Combinatorics — O(m+n)

Total moves = `(m-1) + (n-1)`. Choose which `m-1` are "down": `C(m+n-2, m-1)`.

```
FUNCTION uniquePaths(m, n):
    RETURN C(m + n - 2, m - 1)
```

---

## 4. Follow-Up Questions

### Unique Paths II (LeetCode #63)?
Some cells are obstacles (`1`). Set `dp[i][j] = 0` for obstacles.

### Minimum Path Sum (LeetCode #64)?
Each cell has a cost. `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`.

---

## Key Takeaway

> Classic grid DP. Each cell's paths = sum of paths from above and left. The combinatorial formula gives O(min(m,n)) time.
