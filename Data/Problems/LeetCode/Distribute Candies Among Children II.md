# 2929. Distribute Candies Among Children II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/distribute-candies-among-children-ii](https://leetcode.com/problems/distribute-candies-among-children-ii)
**Companies:** Amazon, Google, Meta, Phonepe, Rubrik

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Inclusion-Exclusion](#approach-inclusion-exclusion)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Distribute `n` candies among **3 children** such that no child gets more than `limit` candies. Return the total number of ways.

**Constraints:**
- `1 <= n <= 10^6`
- `1 <= limit <= 10^6`

---

## Examples

```
Input: n = 5, limit = 2
Output: 3   →  (1,2,2), (2,1,2), (2,2,1)
```

```
Input: n = 3, limit = 3
Output: 10  →  All non-negative integer solutions to a+b+c=3
```

---

## Key Insight

> **Stars and bars:** C(n+2, 2) ways to distribute n among 3 without upper bounds. Apply **inclusion-exclusion** to remove distributions where any child exceeds `limit`:
> - Subtract cases where ≥1 child > limit
> - Add back cases where ≥2 children > limit
> - Subtract cases where all 3 > limit

---

## Approach: Inclusion-Exclusion ✅

```
FUNCTION distributeCandies(n, limit):
    // Stars and bars with upper bound using inclusion-exclusion
    FUNCTION C2(x): RETURN x * (x - 1) / 2 IF x >= 2 ELSE 0

    total = C2(n + 2)
    // Subtract: at least one child > limit
    total -= 3 * C2(n - limit + 1)
    // Add back: at least two children > limit
    total += 3 * C2(n - 2 * limit)
    // Subtract: all three > limit
    total -= C2(n - 3 * limit - 1)

    RETURN MAX(0, total)
```

---

## Walkthrough

```
n = 5, limit = 2
```

- `C2(7) = 21` — unrestricted distributions
- Subtract: `3 × C2(4) = 3 × 6 = 18` — one child > 2
- Add back: `3 × C2(1) = 0` — two children > 2 (C2(1)=0)
- Subtract: `C2(-2) = 0` — all three > 2

Total = 21 - 18 + 0 - 0 = **3** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Closed-form calculation |
| **Space** | O(1) | No extra storage |

---

## Follow-Up Questions

**Q1: How does stars and bars work here?**
> Distributing n identical items into 3 distinct bins = choosing 2 dividers among n+2 positions = C(n+2, 2).

**Q2: Why does inclusion-exclusion correct for upper bounds?**
> To count "child i > limit", substitute `x_i = y_i + limit + 1` (forced excess). The remaining candies `n - limit - 1` are distributed without restriction. By symmetry, multiply by 3 for any one child.

---

## Key Takeaway

> **Stars-and-bars + inclusion-exclusion is the standard approach for bounded distribution problems — it gives O(1) closed-form solutions for any fixed number of bins.**
