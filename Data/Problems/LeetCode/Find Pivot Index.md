# 724. Find Pivot Index

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-pivot-index](https://leetcode.com/problems/find-pivot-index)
**Companies:** Accenture, Agoda, Amazon, Apple, Attentive, Bloomberg, Coupang, Expedia, Goldman Sachs, Google, Ibm, Meta, Microsoft, Myntra, Radius, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix Sum — O(n) ✅](#4-approach-prefix-sum--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of integers `nums`, return the **pivot index** — the index where the sum of all elements to its left equals the sum of all elements to its right.

If no such index exists, return `-1`. If there are multiple pivot indices, return the **leftmost** one. Elements at the pivot index itself are not included in either side's sum.

**Constraints:**
- `1 <= nums.length <= 10⁴`
- `-1000 <= nums[i] <= 1000`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1, 7, 3, 6, 5, 6]
  Output: 3
  Reason: leftSum = 1+7+3 = 11, rightSum = 5+6 = 11.

Example 2:
  Input:  nums = [1, 2, 3]
  Output: -1
  Reason: No index satisfies the condition.

Example 3:
  Input:  nums = [2, 1, -1]
  Output: 0
  Reason: leftSum = 0, rightSum = 1+(-1) = 0.
```

---

## 3. Key Insight

> `rightSum = total - leftSum - nums[i]`. So instead of computing both prefix and suffix sums, compute `total` once, then maintain a running `leftSum`. At each index, check if `leftSum == total - leftSum - nums[i]`.

---

## 4. Approach: Prefix Sum — O(n) ✅

```
FUNCTION pivotIndex(nums):
    total = SUM(nums)
    leftSum = 0

    FOR i ← 0 TO n - 1:
        // rightSum = total - leftSum - nums[i]
        IF leftSum == total - leftSum - nums[i]:
            RETURN i
        leftSum += nums[i]

    RETURN -1
```

---

## 5. Walkthrough

```
nums = [1, 7, 3, 6, 5, 6]
total = 28

i=0: leftSum=0,  rightSum=28-0-1=27  → 0 ≠ 27
     leftSum=1
i=1: leftSum=1,  rightSum=28-1-7=20  → 1 ≠ 20
     leftSum=8
i=2: leftSum=8,  rightSum=28-8-3=17  → 8 ≠ 17
     leftSum=11
i=3: leftSum=11, rightSum=28-11-6=11 → 11 == 11 ✅ RETURN 3
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — one pass to sum, one pass to find pivot |
| **Space** | O(1) — only two variables |

---

## 7. Follow-Up Questions

### 7.1 What if we need all pivot indices?

Continue the loop instead of returning early; collect all indices where the condition holds.

### 7.2 How does this relate to prefix sum arrays?

`leftSum` is the prefix sum up to `i-1`. The approach avoids building a full prefix array by using a running sum.

### 7.3 What about the related problem "Find the Middle Index in Array" (LC 1991)?

Identical problem — the pivot index definition is the same.

---

## 8. Key Takeaway

> **Prefix sum + total trick** lets you check left-right balance at every index in O(n) without extra space. The formula `rightSum = total - leftSum - nums[i]` eliminates the need for a suffix array.
