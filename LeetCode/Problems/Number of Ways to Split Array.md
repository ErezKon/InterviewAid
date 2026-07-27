# 2270. Number of Ways to Split Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-split-array](https://leetcode.com/problems/number-of-ways-to-split-array)
**Companies:** Amazon, Bloomberg, Google, Jpmorgan, Meta, Microsoft, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Prefix Sum — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count valid split indices where the left sum ≥ right sum.

---

## 2. Approach: Prefix Sum — O(n) ✅

```
FUNCTION waysToSplitArray(nums):
    total = SUM(nums)
    leftSum = 0; count = 0
    FOR i ← 0 TO n - 2:
        leftSum += nums[i]
        IF leftSum >= total - leftSum:
            count += 1
    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Running prefix sum vs total.** `leftSum >= total - leftSum` ↔ `2 * leftSum >= total`. Single pass, no extra array needed.
