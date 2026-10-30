# 62. Unique Paths

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/unique-paths](https://leetcode.com/problems/unique-paths)
**Companies:** Accenture, Akamai, Amazon, Bloomberg, De Shaw, Epam Systems, Flipkart, Goldman Sachs, Google, Grammarly, Linkedin, Meta, Microsoft, Nvidia, Qualcomm, Razorpay, Tcs, Tiktok, Visa, Zoho

---

## 1. Problem Description

There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

Given the two integers `m` and `n`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

The test cases are generated so that the answer will be less than or equal to `2 * 10^9`.

**Constraints:**
- `1 <= m, n <= 100`

---

## 2. Examples

**Example 1:**
```
Input: m = 3, n = 7
Output: 28
```

**Example 2:**
```
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

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
