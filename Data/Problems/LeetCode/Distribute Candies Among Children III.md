# 2927. Distribute Candies Among Children III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/distribute-candies-among-children-iii](https://leetcode.com/problems/distribute-candies-among-children-iii)
**Companies:** Amazon, Rubrik

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Inclusion-Exclusion with Stars and Bars](#approach-inclusion-exclusion-with-stars-and-bars)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Distribute `n` candies among **3 children** such that no child gets more than `limit` candies. Return the **total number** of ways.

Same as LC 2929 (Medium) but with larger constraints: `n, limit` up to `10^8`.

**Constraints:**
- `1 <= n <= 10^8`
- `1 <= limit <= 10^8`

---

## Examples

```
Input: n = 5, limit = 2
Output: 3
Explanation: (1,2,2), (2,1,2), (2,2,1)
```

```
Input: n = 3, limit = 3
Output: 10
Explanation: All non-negative solutions to a+b+c=3 with each ≤ 3.
```

---

## Key Insight

> **Stars and bars** gives C(n+2, 2) unrestricted distributions. Apply **inclusion-exclusion** to subtract cases where children exceed `limit`. This is identical to LC 2929 — the formula works for large n in O(1).

---

## Approach: Inclusion-Exclusion with Stars and Bars ✅

```
FUNCTION distributeCandies(n, limit):
    FUNCTION C2(x): RETURN x * (x - 1) / 2 IF x >= 2 ELSE 0

    total = C2(n + 2)
    // Subtract: at least one child > limit
    total -= 3 * C2(n - limit + 1)
    // Add back: at least two children > limit
    total += 3 * C2(n - 2 * limit)
    // Subtract: all three > limit
    total -= C2(n - 3 * limit - 1)

    RETURN MAX(0, total)
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Closed-form arithmetic |
| **Space** | O(1) | No extra storage |

---

## Key Takeaway

> **Distributing n items into k bins with upper bounds = stars-and-bars + inclusion-exclusion. The closed-form formula handles constraints up to 10^8 in O(1).**
