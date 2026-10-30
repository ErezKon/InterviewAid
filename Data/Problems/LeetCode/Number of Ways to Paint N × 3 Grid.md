# 1411. Number of Ways to Paint N × 3 Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid](https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid)
**Companies:** Amazon, Bloomberg, Fortinet, Google, Intuit, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Pattern DP — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You have a `grid` of size `n x 3` and you want to paint each cell of the grid with exactly one of the three colors: **Red**, **Yellow,** or **Green** while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color).

Given `n` the number of rows of the grid, return *the number of ways* you can paint this `grid`. As the answer may grow large, the answer **must be** computed modulo `10^9 + 7`.

**Constraints:**
- `n == grid.length`
- `1 <= n <= 5000`

---

## 2. Key Insight

> Only 2 row pattern types matter: ABA (2-color) and ABC (3-color). Each has 6 configurations. Transitions between rows follow fixed multipliers.

---

## 3. Approach: Pattern DP — O(n) ✅

```
FUNCTION numOfWays(n):
    MOD = 10^9 + 7
    // Two pattern types for a row of 3:
    // ABA (e.g., 121) → 6 patterns
    // ABC (e.g., 123) → 6 patterns
    aba = 6; abc = 6

    FOR i ← 2 TO n:
        newAba = (3 * aba + 2 * abc) % MOD
        newAbc = (2 * aba + 2 * abc) % MOD
        aba, abc = newAba, newAbc

    RETURN (aba + abc) % MOD
```

---

## Examples

**Example 1:**
```
Input: n = 1
Output: 12
Explanation: There are 12 possible way to paint the grid as shown.
```

**Example 2:**
```
Input: n = 5000
Output: 30228214
```

---

## Walkthrough

| Row | ABA patterns | ABC patterns |
|-----|--------------|--------------|
| 1   | 6            | 6            |
| 2   | 3*6 + 2*6 = 30 | 2*6 + 2*6 = 24 |
| 3   | 3*30 + 2*24 = 138 | 2*30 + 2*24 = 108 |

The final answer for n rows is `(ABA + ABC) mod 10⁹+7`.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Classify rows by pattern type, not individual coloring.** ABA→ABA(×3), ABA→ABC(×2), ABC→ABA(×2), ABC→ABC(×2). Linear recurrence → O(1) space.
