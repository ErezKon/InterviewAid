# 738. Monotone Increasing Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/monotone-increasing-digits](https://leetcode.com/problems/monotone-increasing-digits)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy — O(d)](#4-approach-greedy--od)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given integer `n`, return the **largest** number ≤ `n` with monotone non-decreasing digits.

**Constraints:**
- `0 <= n <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: n = 332
  Output: 299
  Explanation: 332's digits decrease (3→2). Decrement first 3→2, fill rest with 9s: 299.
```

---

## 3. Key Insight

> Scan right-to-left. When `digits[i] < digits[i-1]`, decrement `digits[i-1]` and mark position `i`. Everything from mark onward becomes `9`.

---

## 4. Approach: Greedy — O(d) ✅

```
FUNCTION monotoneIncreasingDigits(n):
    digits = list(str(n))
    mark = len(digits)

    FOR i ← len(digits) - 1 DOWN TO 1:
        IF digits[i] < digits[i - 1]:
            mark = i
            digits[i - 1] = str(int(digits[i - 1]) - 1)

    FOR i ← mark TO len(digits) - 1:
        digits[i] = '9'

    RETURN int(JOIN(digits))
```

---

## 5. Walkthrough

```
n = 332 → digits = ['3','3','2']

i=2: '2' < '3' → mark=2, digits=['3','2','2']
i=1: '2' < '3' → mark=1, digits=['2','2','2']

Fill from mark=1: digits=['2','9','9'] → 299 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d) — d = number of digits |
| **Space** | O(d) — digit array |

---

## 7. Key Takeaway

> **Greedy right-to-left scan** — find the violation point, decrement, and fill with 9s. This maximizes the result while maintaining monotonicity.
