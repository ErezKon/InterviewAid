# 1621. Number of Sets of K Non-Overlapping Line Segments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments](https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` points on a 1-D plane, where the `i^th` point (from `0` to `n-1`) is at `x = i`, find the number of ways we can draw **exactly** `k` **non-overlapping** line segments such that each segment covers two or more points. The endpoints of each segment must have **integral coordinates**. The `k` line segments **do not** have to cover all `n` points, and they are **allowed** to share endpoints.

Return *the number of ways we can draw *`k`* non-overlapping line segments**.* Since this number can be huge, return it **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= n <= 1000`
- `1 <= k <= n-1`

---

## 2. Examples

**Example 1:**
```
Input: n = 4, k = 2
Output: 5
Explanation: The two line segments are shown in red and blue.
The image above shows the 5 different ways {(0,2),(2,3)}, {(0,1),(1,3)}, {(0,1),(2,3)}, {(1,2),(2,3)}, {(0,1),(1,2)}.
```

**Example 2:**
```
Input: n = 3, k = 1
Output: 3
Explanation: The 3 ways are {(0,1)}, {(0,2)}, {(1,2)}.
```

**Example 3:**
```
Input: n = 30, k = 7
Output: 796297179
Explanation: The total number of possible ways to draw 7 line segments is 3796297200. Taking this number modulo 10^9 + 7 gives us 796297179.
```

---

## 3. Approach

**Algorithm:** Combinatorial formula using stars-and-bars.

The problem reduces to selecting `2k` endpoints from `n + k - 1` positions, giving the answer `C(n + k - 1, 2k)` modulo `10⁹+7`.

**Pseudocode:**
```text
FUNCTION numberOfSets(n, k):
    MOD ← 1_000_000_007
    RETURN COMBINATION(n + k - 1, 2 * k) MOD MOD
```

---

## 4. Walkthrough

For `n = 4, k = 2`:

- Compute `n + k - 1 = 5` and `2k = 4`.
- `C(5,4) = 5`.
- Apply modulo (no change) → 5.
- After accounting for overlapping constraints, the valid count is 3 (as shown in the example).

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) – computing the combination |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would the solution change if overlapping at endpoints were allowed?
2. Can you derive a DP solution that works for larger `n` without the combinatorial shortcut?
3. How would you extend the problem to 2-D points forming non-overlapping line segments?

---

## 7. Key Takeaway

> **Stars-and-bars transforms the segment-selection problem into a simple combination**, enabling an O(k) solution.
