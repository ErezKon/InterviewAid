# 2184. Number of Ways to Build Sturdy Brick Wall

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-build-sturdy-brick-wall](https://leetcode.com/problems/number-of-ways-to-build-sturdy-brick-wall)
**Companies:** Google, Microstrategy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate Rows + DP — O(R² · height)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Build a wall of given width and height using bricks of given sizes. No two consecutive rows can have aligned vertical edges (except wall edges). Count valid walls.

---

## 2. Key Insight

> Enumerate all valid row configurations (bitmask of joint positions). Two rows are compatible if their joints don't align. DP layer by layer with compatibility matrix.

---

## 3. Approach: Enumerate Rows + DP — O(R² · height) ✅

```
// 1. Generate all valid row configs for given width
// 2. Build compatibility graph between row configs
// 3. dp[row][config] = ways to build row layers ending with config
// 4. Matrix exponentiation for large heights
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(R² · h) where R = valid row configs |
| **Space** | O(R) |

---

## 5. Key Takeaway

> **Row enumeration + layer DP.** Represent joints as bitmasks. Compatible rows have no shared joint positions. Transition via compatibility matrix.
