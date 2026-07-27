# 2827. Number of Beautiful Integers in the Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-beautiful-integers-in-the-range](https://leetcode.com/problems/number-of-beautiful-integers-in-the-range)
**Companies:** Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Digit DP — O(d · k · d²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count integers in `[low, high]` where `#even_digits == #odd_digits` and the number is divisible by `k`.

---

## 2. Key Insight

> **Digit DP** with states: position, `tight` bound, `started` (no leading zeros), count difference (even - odd digits), and remainder mod `k`. Use `count(high) - count(low - 1)`.

---

## 3. Approach: Digit DP — O(d · k · d²) ✅

```
FUNCTION numberOfBeautifulIntegers(low, high, k):
    RETURN countUpTo(high, k) - countUpTo(low - 1, k)

FUNCTION countUpTo(n, k):
    digits = str(n)
    // DP(pos, tight, started, diff, mod)
    // diff = #even - #odd digits so far
    // mod = current number mod k
    // At end: valid if started AND diff == 0 AND mod == 0
    RETURN dp(0, true, false, 0, 0)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d² · k · 10) where d = digit count |
| **Space** | O(d² · k) for memoization |

---

## 5. Key Takeaway

> **Triple-constraint digit DP.** Track digit balance (even vs odd) and remainder mod k simultaneously. Classic pattern: `count(high) - count(low-1)` for range queries.
