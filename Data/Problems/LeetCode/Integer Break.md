# 343. Integer Break

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/integer-break](https://leetcode.com/problems/integer-break)
**Companies:** Accenture, Amazon, Bloomberg, Citadel, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Math (3s and 2s) — O(1) ✅](#4-approach-math-3s-and-2s--o1-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer `n >= 2`, break it into the sum of **at least two** positive integers and maximize the **product** of those integers. Return the maximum product.

**Constraints:**
- `2 <= n <= 58`

---

## 2. Examples

```
Input: n = 2 → Output: 1   (2 = 1+1, product = 1)
Input: n = 10 → Output: 36  (10 = 3+3+4, product = 3×3×4 = 36)
```

---

## 3. Key Insight

Mathematically, **3 is the optimal factor**. Break `n` into as many 3s as possible:
- If remainder is 0 → all 3s
- If remainder is 1 → replace one 3+1 with 2+2 (since 2×2 > 3×1)
- If remainder is 2 → keep the 2

Special cases: n=2 → 1, n=3 → 2 (must split into at least two parts).

---

## 4. Approach: Math (3s and 2s) — O(1) ✅

```
FUNCTION integerBreak(n):
    IF n == 2: RETURN 1
    IF n == 3: RETURN 2

    IF n % 3 == 0: RETURN 3^(n/3)
    IF n % 3 == 1: RETURN 3^(n/3 - 1) * 4
    RETURN 3^(n/3) * 2
```

---

## 5. Walkthrough

```
n = 10:
  10 / 3 = 3 remainder 1
  Remainder is 1 → use one fewer 3, multiply by 4
  3^(3-1) × 4 = 9 × 4 = 36

Verification: 10 = 3 + 3 + 4, product = 3 × 3 × 4 = 36 ✅
```

| n | Breakdown | Product |
|---|-----------|---------|
| 2 | 1+1 | 1 |
| 6 | 3+3 | 9 |
| 7 | 3+4 | 12 |
| 10 | 3+3+4 | 36 |

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(1) | Pure math formula |
| Space | O(1) | No extra storage |

---

## 7. Follow-Up Questions

### 7.1 Why is 3 optimal?

By AM-GM inequality, for fixed sum, the product is maximized when all parts are equal. The optimal equal part is `e ≈ 2.718`, and 3 is the closest integer.

### 7.2 Can this be solved with DP?

Yes. `dp[i] = max(j × (i-j), j × dp[i-j])` for all `j`. O(n²) time but less elegant.

### 7.3 What if we allow breaking into at most k parts?

This becomes a constrained optimization — use DP with an extra dimension for the number of parts used.

---

## 8. Key Takeaway

> Maximize the product by breaking into **3s** (with 2s to handle remainders). The mathematical proof comes from calculus/AM-GM: e ≈ 2.718 is optimal, and 3 is the nearest useful integer since 2² < 3² but 2³ > 3².
