# 1619. Mean of Array After Removing Some Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/mean-of-array-after-removing-some-elements](https://leetcode.com/problems/mean-of-array-after-removing-some-elements)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `arr`, remove the smallest 5% and the largest 5% of elements, then return the **mean** of the remaining elements.

**Constraints:**
- `20 ≤ arr.length ≤ 1000`
- `arr.length` is a multiple of 20
- `0 ≤ arr[i] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  arr = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]
Output: 2.0
Explanation: 5% = 1 element removed from each end. Remove 1 and 3. Mean of remaining = 2.0.
```

---

## Key Insight

> Sort the array, trim `n/20` elements from each end (5% from smallest and 5% from largest), then compute the average of the remaining elements. This is known as a **trimmed mean**.

---

## Approach

```
FUNCTION trimMean(arr):
    SORT arr
    n ← LEN(arr)
    trim ← n / 20
    total ← SUM(arr[trim .. n - trim - 1])
    RETURN total / (n - 2 * trim)
```

---

## Walkthrough

```
arr = [6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0] (n=20)
Sorted: [0,0,0,0,1,2,2,2,3,5,5,5,5,6,6,7,7,8,8,10]
trim = 20/20 = 1
Remove index 0 (value 0) and index 19 (value 10)
Remaining: [0,0,0,1,2,2,2,3,5,5,5,5,6,6,7,7,8,8]
Sum = 72, count = 18
Mean = 72/18 = 4.0 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + trim | **O(n log n)** | **O(1)** (in-place sort) |

---

## Key Takeaway

> **Trimmed mean** is a standard statistical operation — sort, drop extremes, average the rest. Direct implementation in O(n log n).

---
