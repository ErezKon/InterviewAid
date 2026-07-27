# 3862. Find the Smallest Balanced Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-smallest-balanced-index](https://leetcode.com/problems/find-the-smallest-balanced-index)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Prefix Sum — O(n) ✅](#2-approach-prefix-sum--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, find the smallest index `i` where the sum of elements before `i` equals the sum of elements after `i` (balanced index).

---

## 2. Approach: Prefix Sum — O(n) ✅

```
FUNCTION smallestBalancedIndex(nums):
    total ← SUM(nums); leftSum ← 0
    FOR i ← 0 TO n - 1 DO
        IF leftSum == total - leftSum - nums[i] THEN
            RETURN i
        leftSum += nums[i]
    RETURN -1
```

---

## 3. Key Takeaway

> Same pivot index pattern: track left sum, derive right sum as `total - left - current`. Return first match.
