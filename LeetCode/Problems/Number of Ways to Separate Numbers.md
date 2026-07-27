# 1977. Number of Ways to Separate Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-separate-numbers](https://leetcode.com/problems/number-of-ways-to-separate-numbers)
**Companies:** Amazon, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + LCP — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Split a digit string into a non-decreasing sequence of positive integers (no leading zeros). Count valid splits mod 10⁹+7.

---

## 2. Key Insight

> `dp[i][j]` = ways to partition `s[0..i]` where the last number starts at `j`. A number starting at `j` ending at `i` must be ≥ the previous number. Use LCP (longest common prefix) array for O(1) comparisons.

---

## 3. Approach: DP + LCP — O(n²) ✅

```
// Precompute LCP[i][j] = longest common prefix starting at i and j
// dp[i][j] = ways to partition s[0..i] with last number starting at j
// Transition: compare last two numbers using LCP for O(1) ≥ check
// Use prefix sums over dp for efficient summation
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²) |

---

## 5. Key Takeaway

> **LCP array enables O(1) number comparison.** Standard partition DP becomes O(n²) instead of O(n³) by using LCP for string comparison and prefix sums for range queries.
