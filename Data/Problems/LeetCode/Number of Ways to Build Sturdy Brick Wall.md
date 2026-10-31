# 2184. Number of Ways to Build Sturdy Brick Wall

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-build-sturdy-brick-wall](https://leetcode.com/problems/number-of-ways-to-build-sturdy-brick-wall)
**Companies:** Google, Microstrategy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate Rows + DP — O(R² · height)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given integers `height` and `width` which specify the dimensions of a brick wall you are building. You are also given a **0-indexed** array of **unique** integers `bricks`, where the `i^th` brick has a height of `1` and a width of `bricks[i]`. You have an **infinite **supply of each type of brick and bricks may **not** be rotated.

Each row in the wall must be exactly `width` units long. For the wall to be **sturdy**, adjacent rows in the wall should **not **join bricks at the same location, except at the ends of the wall.

Return *the number of ways to build a **sturdy **wall.* Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= height <= 100`
- `1 <= width <= 10`
- `1 <= bricks.length <= 10`
- `1 <= bricks[i] <= 10`
- All the values of `bricks` are **unique**.

---

## 2. Key Insight

> Enumerate all valid row configurations (bitmask of joint positions). Two rows are compatible if their joints don't align. DP layer by layer with compatibility matrix.

---

## 3. Approach: Enumerate Rows + DP — O(R² · height) ✅

```text
// 1. Generate all valid row configs for given width using bricks of size 1 and 2
// 2. Represent each config as a bitmask of joint positions (excluding outer edges)
// 3. Build compatibility matrix: configs i and j are compatible if (mask_i & mask_j) == 0
// 4. dp[height][config] = sum of dp[height-1][prev] for all prev compatible with config
// 5. Answer = sum of dp[height][*]
```

---

## 4. Examples

**Example 1:**
```
Input: height = 2, width = 3, bricks = [1,2]
Output: 2
Explanation: The first two walls in the diagram show the only two ways to build a sturdy brick wall.
Note that the third wall in the diagram is not sturdy because adjacent rows join bricks 2 units from the left.
```

**Example 2:**
```
Input: height = 1, width = 1, bricks = [5]
Output: 0
Explanation: There are no ways to build a sturdy wall because the only type of brick we have is longer than the width of the wall.
```

---

## 5. Walkthrough

**Example 1:** `width = 2, height = 2`
1. Generate row configs: `11` (two 1-bricks) → mask `0b0`; `2` (one 2-brick) → mask `0b1` (joint at position 1).
2. Compatibility:
   - `mask 0b0` compatible with both masks.
   - `mask 0b1` only compatible with `mask 0b0` (cannot stack two `0b1` rows because joints align).
3. DP layer 1 (first row): each config count = 1.
4. DP layer 2:
   - From `0b0` we can go to both `0b0` and `0b1` → adds 1 each.
   - From `0b1` we can only go to `0b0` → adds 1 to `0b0`.
   - Totals: `0b0` = 2, `0b1` = 1.
5. Sum = 3 valid walls.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(R² · h) where R = number of row configs |
| **Space** | O(R) |

---

## 7. Key Takeaway

> **Row enumeration + layer DP.** Represent joints as bitmasks. Compatible rows have no shared joint positions. Transition via compatibility matrix.
