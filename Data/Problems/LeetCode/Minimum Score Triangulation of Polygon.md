# 1039. Minimum Score Triangulation of Polygon

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-score-triangulation-of-polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon)
**Companies:** Amazon, Google, Meta, Microsoft, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Interval DP — O(n³)](#4-approach-interval-dp--on³)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You have a convex `n`-sided polygon where each vertex has an integer value. You are given an integer array `values` where `values[i]` is the value of the `i^th` vertex in **clockwise order**.

**Polygon** **triangulation** is a process where you divide a polygon into a set of triangles and the vertices of each triangle must also be vertices of the original polygon. Note that no other shapes other than triangles are allowed in the division. This process will result in `n - 2` triangles.

You will **triangulate** the polygon. For each triangle, the *weight* of that triangle is the product of the values at its vertices. The total score of the triangulation is the sum of these *weights* over all `n - 2` triangles.

Return the* minimum possible score *that you can achieve with some* ***triangulation*** *of the polygon.

**Constraints:**
- `n == values.length`
- `3 <= n <= 50`
- `1 <= values[i] <= 100`

---

## 2. Examples

**Example 1:**
```
![img](https://assets.leetcode.com/uploads/2025/10/23/ex0-2.png)
Input: values = [1,2,3]
Output: 6
Explanation: The polygon is already triangulated, and the score of the only triangle is 6.
```

**Example 2:**
```
Input: values = [3,7,4,5]
Output: 144
Explanation: There are two triangulations, with possible scores: 3*7*5 + 4*5*7 = 245, or 3*4*5 + 3*4*7 = 144.
The minimum score is 144.
```

**Example 3:**
```
![img](https://assets.leetcode.com/uploads/2025/10/23/ex2.png)
Input: values = [1,3,1,4,1,5]
Output: 13
Explanation: The minimum score triangulation is 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13.
```

---

## 3. Key Insight

> **Interval DP**: fix edge (i,j), choose vertex `k` between them to form triangle (i,k,j). The cost = `dp[i][k] + dp[k][j] + values[i]*values[k]*values[j]`. This splits the polygon into two smaller subpolygons. Similar to **Matrix Chain Multiplication**.

---

## 4. Approach: Interval DP — O(n³) ✅

```
FUNCTION minScoreTriangulation(values):
    n = len(values)
    dp = n × n zeros

    FOR length ← 3 TO n:
        FOR i ← 0 TO n - length:
            j = i + length - 1
            dp[i][j] = infinity
            FOR k ← i + 1 TO j - 1:
                dp[i][j] = MIN(dp[i][j],
                    dp[i][k] + dp[k][j] + values[i] * values[k] * values[j])

    RETURN dp[0][n-1]
```

---

## 5. Walkthrough

```
values = [3, 7, 4, 5], n=4

Length 3:
  dp[0][2]: k=1 → 0+0+3×7×4 = 84
  dp[1][3]: k=2 → 0+0+7×4×5 = 140

Length 4:
  dp[0][3]:
    k=1 → dp[0][1]+dp[1][3]+3×7×5 = 0+140+105 = 245
    k=2 → dp[0][2]+dp[2][3]+3×4×5 = 84+0+60 = 144 ✅

Answer = 144 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n³) — three nested loops |
| **Space** | O(n²) — DP table |

---

## 7. Follow-Up Questions

**Q1: How is this related to Matrix Chain Multiplication?**
Both use interval DP with a "split point" `k`. MCM minimizes multiplication cost; this minimizes triangle score sum.

**Q2: Can we use memoized recursion instead?**
Yes — `solve(i, j)` with cache. Same complexity, sometimes easier to code.

---

## 8. Key Takeaway

> **Polygon triangulation = interval DP.** Fix an edge, try all split vertices. The recurrence mirrors matrix chain multiplication — a fundamental interval DP pattern.
