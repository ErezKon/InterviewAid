# 2089. Find Target Indices After Sorting Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-target-indices-after-sorting-array](https://leetcode.com/problems/find-target-indices-after-sorting-array)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count Smaller + Count Equal — O(n) ✅](#4-approach-count-smaller--count-equal--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a 0-indexed integer array `nums` and a `target`, return a list of indices where `target` would appear if `nums` were sorted in non-decreasing order.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i], target <= 100`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1, 2, 5, 2, 3], target = 2
  Output: [1, 2]
  Reason: Sorted: [1,2,2,3,5]. Target 2 appears at indices 1 and 2.

Example 2:
  Input:  nums = [1, 2, 5, 2, 3], target = 5
  Output: [4]
```

---

## 3. Key Insight

> You don't need to sort. Count elements **less than** target (= starting index) and count elements **equal to** target (= number of indices). The target indices form a contiguous range.

---

## 4. Approach: Count Smaller + Count Equal — O(n) ✅

```
FUNCTION targetIndices(nums, target):
    countLess ← 0
    countEqual ← 0
    FOR num IN nums DO
        IF num < target THEN countLess += 1
        ELSE IF num == target THEN countEqual += 1

    RETURN [countLess + i FOR i ← 0 TO countEqual - 1]
```

---

## 5. Walkthrough

```
nums = [1, 2, 5, 2, 3], target = 2

countLess = 1 (only 1)
countEqual = 2 (two 2s)

Indices: [1, 2] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) — excluding output |

---

## 7. Follow-Up Questions

### 7.1 Why does counting work?

In a sorted array, all elements < target come first, then all equal, then all greater. So target starts at index `countLess` and occupies `countEqual` consecutive slots.

### 7.2 What if target doesn't exist?

`countEqual = 0`, so the result is an empty list.

---

## 8. Key Takeaway

> **Count less + count equal** gives you the exact range of target indices in O(n) without sorting. This is a counting-sort insight applied to a specific query.
