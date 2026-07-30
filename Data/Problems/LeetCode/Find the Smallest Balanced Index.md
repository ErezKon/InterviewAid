# 3862. Find the Smallest Balanced Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-smallest-balanced-index](https://leetcode.com/problems/find-the-smallest-balanced-index)
**Companies:** Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Prefix Sum — O(n) ✅](#2-approach-prefix-sum--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, find the smallest index `i` where the sum of elements before `i` equals the sum of elements after `i` (balanced index).

---

## 2. Approach: Prefix Sum — O(n) ✅

```text
FUNCTION smallestBalancedIndex(nums):
    total ← SUM(nums)
    leftSum ← 0
    FOR i FROM 0 TO LENGTH(nums)-1 DO
        IF leftSum == total - leftSum - nums[i] THEN
            RETURN i
        leftSum ← leftSum + nums[i]
    RETURN -1
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [2, 0, 0, 0]
Output: 0
Explanation: Left sum = 0, right sum = 0 + 0 + 0 = 0.
```

**Example 2:**
```
Input: nums = [1, 2, 3, 4, 6]
Output: 3
Explanation: At index 3, left sum = 1+2+3 = 6, right sum = 6.
```

---

## 4. Walkthrough

Take `nums = [1,2,3,4,6]`.
| i | nums[i] | leftSum (before) | rightSum (after) | Balanced? |
|---|---------|------------------|------------------|-----------|
|0|1|0|2+3+4+6=15|No|
|1|2|1|3+4+6=13|No|
|2|3|1+2=3|4+6=10|No|
|3|4|1+2+3=6|6|Yes → return 3 |

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Track left sum while iterating; right sum is total minus left sum minus current element. Return first index where they match.
