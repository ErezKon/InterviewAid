# 2862. Maximum Element-Sum of a Complete Subset of Indices

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-element-sum-of-a-complete-subset-of-indices](https://leetcode.com/problems/maximum-element-sum-of-a-complete-subset-of-indices)
**Companies:** Purplle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Group by Square-Free Part — O(n√n)](#approach-group-by-square-free-part--onn-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A "complete subset" of indices means every pair `(i, j)` in the subset has `i * j` being a perfect square. Find the subset with maximum element sum.

**Constraints:**
- `1 ≤ n ≤ 10⁴`

---

## Key Insight

> `i * j` is a perfect square iff `i` and `j` have the same **square-free part** (the product of primes with odd exponents). Group indices by their square-free part. Each group forms a valid "complete subset." Sum each group and return the maximum.

---

## Approach: Group by Square-Free Part — O(n√n) ✅

```
FUNCTION maximumSum(nums):
    FUNCTION squareFreePart(x):
        result = 1
        FOR p ← 2 WHILE p * p <= x:
            count = 0
            WHILE x % p == 0: x /= p; count += 1
            IF count % 2 == 1: result *= p
        IF x > 1: result *= x
        RETURN result

    groups = defaultdict(0)
    FOR i ← 1 TO n:
        key = squareFreePart(i)
        groups[key] += nums[i - 1]

    RETURN MAX(groups.values())
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Group by square-free part | **O(n√n)** | O(n) |

---

## Key Takeaway

> **"Product is perfect square" ↔ same square-free part.** Group indices by their square-free factorization and sum each group.
