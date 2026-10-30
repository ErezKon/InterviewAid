# 2485. Find the Pivot Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-pivot-integer](https://leetcode.com/problems/find-the-pivot-integer)
**Companies:** Amazon, Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Math — O(1) ✅](#4-approach-math--o1-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)
---

## 1. Problem Description

Given a positive integer `n`, find the **pivot integer** `x` such that:

- The sum of all elements between `1` and `x` inclusively equals the sum of all elements between `x` and `n` inclusively.

Return *the pivot integer *`x`. If no such integer exists, return `-1`. It is guaranteed that there will be at most one pivot index for the given input.

**Constraints:**
- `1 <= n <= 1000`

---

## 2. Examples

**Example 1:**
```
Input: n = 8
Output: 6
Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.
```

**Example 2:**
```
Input: n = 1
Output: 1
Explanation: 1 is the pivot integer since: 1 = 1.
```

**Example 3:**
```
Input: n = 4
Output: -1
Explanation: It can be proved that no such integer exist.
```

---

## 3. Key Insight

> Sum 1..x = Sum x..n implies `x(x+1)/2 = n(n+1)/2 - x(x-1)/2`, simplifying to `x² = n(n+1)/2`. Check if this is a perfect square.
---

## 4. Approach: Math — O(1) ✅

```text
FUNCTION pivotInteger(n):
    // Compute target sum of 1..x = total/2
    total ← n * (n + 1) // 2
    x ← FLOOR(SQRT(total))
    RETURN x IF x * x == total ELSE -1
```
---

## 5. Walkthrough

Take `n = 8`:
1. `total = 8 * 9 / 2 = 36`.
2. `x = floor(sqrt(36)) = 6`.
3. `6 * 6 == 36` → pivot exists, return `6`.
For `n = 4`:
1. `total = 4 * 5 / 2 = 10`.
2. `x = floor(sqrt(10)) = 3`.
3. `3 * 3 != 10` → no pivot, return `-1`.
---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) |
| **Space** | O(1) |
---

## 7. Key Takeaway

> Derive `x² = n(n+1)/2` algebraically. If this value is a perfect square, `x = √(n(n+1)/2)`, else no pivot exists.
