# 2465. Number of Distinct Averages

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-averages](https://leetcode.com/problems/number-of-distinct-averages)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Sort + Two Pointers — O(n log n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Repeatedly remove the min and max, compute their average. Return the number of **distinct** averages.

---

## 2. Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION distinctAverages(nums):
    SORT(nums)
    averages = set()
    lo, hi = 0, len(nums) - 1
    WHILE lo < hi:
        averages.ADD((nums[lo] + nums[hi]) / 2)
        lo += 1; hi -= 1
    RETURN len(averages)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 4. Key Takeaway

> **Sort then pair min/max with two pointers.** Collect averages in a set for uniqueness.
