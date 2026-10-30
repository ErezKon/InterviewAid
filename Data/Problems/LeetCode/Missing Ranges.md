# 163. Missing Ranges

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/missing-ranges](https://leetcode.com/problems/missing-ranges)
**Companies:** Apple, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Linear Scan — O(n)](#4-approach-linear-scan--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an inclusive range `[lower, upper]` and a **sorted unique** integer array `nums`, where all elements are within the inclusive range.

A number `x` is considered **missing** if `x` is in the range `[lower, upper]` and `x` is not in `nums`.

Return *the **shortest sorted** list of ranges that **exactly covers all the missing numbers***. That is, no element of `nums` is included in any of the ranges, and each missing number is covered by one of the ranges.

**Constraints:**
- `-10^9 <= lower <= upper <= 10^9`
- `0 <= nums.length <= 100`
- `lower <= nums[i] <= upper`
- All the values of `nums` are **unique**.

---

## 2. Examples

**Example 1:**
```
Input: nums = [0,1,3,50,75], lower = 0, upper = 99
Output: [[2,2],[4,49],[51,74],[76,99]]
Explanation: The ranges are:
[2,2]
[4,49]
[51,74]
[76,99]
```

**Example 2:**
```
Input: nums = [-1], lower = -1, upper = -1
Output: []
Explanation: There are no missing ranges since there are no missing numbers.
```

---

## 3. Key Insight

> Track `prev` (previous boundary). For each number and the boundaries, if there's a gap ≥ 2 between prev and current, add the range `[prev+1, curr-1]`.

---

## 4. Approach: Linear Scan — O(n) ✅

```
FUNCTION findMissingRanges(nums, lower, upper):
    result = []
    prev = lower - 1
    FOR i ← 0 TO len(nums):
        curr = nums[i] IF i < len(nums) ELSE upper + 1
        IF curr - prev >= 2:
            result.ADD([prev + 1, curr - 1])
        prev = curr
    RETURN result
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) extra |

---

## 6. Key Takeaway

> **Gap detection with boundary sentinels.** Use `lower-1` and `upper+1` as virtual boundaries. Any gap ≥ 2 between consecutive values forms a missing range.
