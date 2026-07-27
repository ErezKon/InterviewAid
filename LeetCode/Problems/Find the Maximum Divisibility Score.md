# 2644. Find the Maximum Divisibility Score

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-divisibility-score](https://leetcode.com/problems/find-the-maximum-divisibility-score)
**Companies:** De Shaw

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Brute Force Count — O(n·m) ✅](#2-approach-brute-force-count--onm-)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given arrays `nums` and `divisors`, for each divisor count how many elements in `nums` it divides evenly. Return the divisor with the maximum count. If tied, return the smallest divisor.

**Constraints:**
- `1 <= nums.length, divisors.length <= 1000`

---

## 2. Approach: Brute Force Count — O(n·m) ✅

```
FUNCTION maxDivScore(nums, divisors):
    bestDiv ← -1; bestCount ← -1
    FOR d IN SORTED(divisors) DO
        count ← SUM(1 for x in nums if x % d == 0)
        IF count > bestCount THEN
            bestCount ← count
            bestDiv ← d
    RETURN bestDiv
```

---

## 3. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> Simple brute force: for each divisor, count divisible elements. Sort divisors first to auto-handle the tie-breaking (smallest divisor wins).
