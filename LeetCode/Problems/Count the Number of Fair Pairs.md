# 2563. Count the Number of Fair Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-fair-pairs](https://leetcode.com/problems/count-the-number-of-fair-pairs)
**Companies:** Amazon, Bloomberg, Google, Mcdonalds, Meta, Microsoft, Qualcomm, Salesforce, Tcs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integers `lower` and `upper`, count pairs `(i, j)` where `i < j` and `lower <= nums[i] + nums[j] <= upper`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Key Insight

Sort the array (pair order doesn't matter for counting). Use the identity: `countInRange(lower, upper) = countLess(upper) - countLess(lower - 1)`. Each `countLess` uses a two-pointer approach on the sorted array.

---

## Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION countFairPairs(nums, lower, upper):
    SORT nums
    RETURN countLess(nums, upper) - countLess(nums, lower - 1)

FUNCTION countLess(nums, target):
    count = 0
    lo, hi = 0, len(nums) - 1
    WHILE lo < hi:
        IF nums[lo] + nums[hi] <= target:
            count += hi - lo
            lo += 1
        ELSE:
            hi -= 1
    RETURN count
```

---

## Walkthrough

**Input:** `nums = [0,1,7,4,4,5], lower = 3, upper = 6`

```
Sorted: [0, 1, 4, 4, 5, 7]

countLess(6):  pairs with sum ≤ 6
  lo=0,hi=5: 0+7=7>6 → hi=4
  lo=0,hi=4: 0+5=5≤6 → count+=4, lo=1
  lo=1,hi=4: 1+5=6≤6 → count+=3, lo=2
  lo=2,hi=4: 4+5=9>6 → hi=3
  lo=2,hi=3: 4+4=8>6 → hi=2, done → 7

countLess(2):  pairs with sum ≤ 2
  lo=0,hi=5: 0+7=7>2 → ... → count=1 (only 0+1)

Result: 7 - 1 = 6
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(1) extra (in-place sort) |

---

## Key Takeaway

> **Counting pairs with sum in a range: sort + two-pointer `countLess`. Decompose range `[lower, upper]` into `countLess(upper) - countLess(lower-1)` for clean implementation.**
