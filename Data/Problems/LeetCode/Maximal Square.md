# 221. Maximal Square

**Difficulty:** 🟡 Medium
**Acceptance:** 47.0%
**LeetCode:** [https://leetcode.com/problems/maximal-square](https://leetcode.com/problems/maximal-square)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Bookingcom, Bytedance, Citadel, Dp World, Ebay, Flipkart, Goldman Sachs, Google, Gsa Capital, Karat, Meta, Microsoft, Nvidia, Oppo, Oracle, Paypal, Phonepe, Qualtrics, Salesforce, Sap, Tiktok, Whatnot, Wise, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: DP — O(m·n) ✅](#3-approach-dp--omn-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given an `m x n` binary matrix filled with `0`'s and `1`'s, find the largest square containing only `1`'s and return its **area**.

**Constraints:**
- `1 <= m, n <= 300`
- `matrix[i][j]` is `'0'` or `'1'`.

---

## 2. Examples

```
Example 1:
  Input:  matrix = [["1","0","1","0","0"],
                    ["1","0","1","1","1"],
                    ["1","1","1","1","1"],
                    ["1","0","0","1","0"]]
  Output: 4 (2×2 square)

Example 2:
  Input:  matrix = [["0","1"],["1","0"]]
  Output: 1
```

---

## 3. Approach: DP — O(m·n) ✅

### Key Insight

`dp[i][j]` = side length of the largest square whose **bottom-right corner** is at `(i, j)`.

### Recurrence

If `matrix[i][j] == '1'`:
```
dp[i][j] = MIN(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
```

If `matrix[i][j] == '0'`:
```
dp[i][j] = 0
```

### Why MIN of three neighbors?

A square of side `s` at `(i,j)` requires:
- A square of side `s-1` ending at `(i-1,j)` (above)
- A square of side `s-1` ending at `(i,j-1)` (left)
- A square of side `s-1` ending at `(i-1,j-1)` (diagonal)

The bottleneck is the smallest of these three.

### Pseudocode

```
FUNCTION maximalSquare(matrix):
    m, n = dimensions
    dp = m × n matrix of zeros
    maxSide = 0

    FOR i ← 0 TO m - 1:
        FOR j ← 0 TO n - 1:
            IF matrix[i][j] == '1':
                IF i == 0 OR j == 0:
                    dp[i][j] = 1
                ELSE:
                    dp[i][j] = MIN(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                maxSide = MAX(maxSide, dp[i][j])

    RETURN maxSide * maxSide
```

### Space Optimization

Only need the previous row → O(n) space with a single variable for `dp[i-1][j-1]`.

---

## 4. Walkthrough

```
matrix = [["1","0","1","0","0"],
          ["1","0","1","1","1"],
          ["1","1","1","1","1"],
          ["1","0","0","1","0"]]

dp:
  [1, 0, 1, 0, 0]
  [1, 0, 1, 1, 1]
  [1, 1, 1, 2, 2]   ← dp[2][3] = min(1,1,1)+1 = 2
  [1, 0, 0, 1, 0]

maxSide = 2, area = 4 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) |
| **Space** | O(m·n), optimizable to O(n) |

---

## 6. Follow-Up Questions

### 6.1 Maximal Rectangle (LeetCode #85)?

Use the histogram approach: for each row, build column heights and apply Largest Rectangle in Histogram. O(m·n).

### 6.2 Count Square Submatrices (LeetCode #1277)?

Same DP. The answer is `SUM(dp[i][j])` — each `dp[i][j] = k` contributes k squares (sizes 1 through k).

### 6.3 What about largest rectangle (not just square)?

Different problem requiring the histogram approach. The square DP doesn't generalize directly to rectangles.

---

## Key Takeaway

> The `min(top, left, diagonal) + 1` recurrence is the core insight. It elegantly captures that a square can only grow if ALL three neighboring squares support it. This DP is a favorite interview problem for its simplicity and visual appeal.
