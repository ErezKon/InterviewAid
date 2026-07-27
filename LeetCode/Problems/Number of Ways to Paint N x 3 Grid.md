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

Paint an n×3 grid with 3 colors such that no two adjacent cells share the same color. Count valid colorings mod 10⁹+7.

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

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Classify rows by pattern type, not individual coloring.** ABA→ABA(×3), ABA→ABC(×2), ABC→ABA(×2), ABC→ABC(×2). Linear recurrence → O(1) space.
