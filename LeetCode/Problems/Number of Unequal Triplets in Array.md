# 2475. Number of Unequal Triplets in Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-unequal-triplets-in-array](https://leetcode.com/problems/number-of-unequal-triplets-in-array)
**Companies:** Paytm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Count — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count triplets `(i, j, k)` where `i < j < k` and all three values are distinct.

---

## 2. Key Insight

> Sort and group by value. For each group of size `g`, the number of valid triplets with the middle element from this group is `left * g * right`, where `left` = elements before, `right` = elements after.

---

## 3. Approach: Sort + Count — O(n log n) ✅

```
FUNCTION unequalTriplets(nums):
    SORT nums
    result = 0; left = 0
    FOR each group of equal values of size g:
        right = n - left - g
        result += left * g * right
        left += g
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Group counting: left × middle × right.** Sort, then for each value group, count elements before and after. Multiply for valid triplets.
