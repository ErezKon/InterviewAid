# 1060. Missing Element in Sorted Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/missing-element-in-sorted-array](https://leetcode.com/problems/missing-element-in-sorted-array)
**Companies:** Amazon, Google, Meta, Paypal

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search — O(log n)](#4-approach-binary-search--olog-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a sorted array with some missing numbers, return the **k-th** missing number starting from `nums[0]`.

**Constraints:**
- `1 <= nums.length <= 5 × 10⁴`

---

## 2. Examples

```
Example 1:
  Input: nums = [4, 7, 9, 10], k = 1
  Output: 5
  Explanation: Missing: 5, 6, 8. 1st missing = 5.
```

---

## 3. Key Insight

> `missing(i) = nums[i] - nums[0] - i` counts how many numbers are missing before index `i`. Binary search for the index where missing count transitions past `k`.

---

## 4. Approach: Binary Search — O(log n) ✅

```
FUNCTION missingElement(nums, k):
    FUNCTION missing(idx): RETURN nums[idx] - nums[0] - idx

    lo, hi = 0, len(nums) - 1
    IF k > missing(hi): RETURN nums[hi] + k - missing(hi)

    WHILE lo < hi - 1:
        mid = (lo + hi) / 2
        IF missing(mid) >= k: hi = mid
        ELSE: lo = mid

    RETURN nums[lo] + k - missing(lo)
```

---

## 5. Walkthrough

```
nums = [4, 7, 9, 10], k = 1

missing(0)=0, missing(1)=2, missing(2)=3, missing(3)=3
k=1: missing(1)=2 ≥ 1, so answer is between index 0 and 1
nums[0] + 1 - 0 = 5 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) — binary search |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Binary search on missing count.** `missing(i) = nums[i] - nums[0] - i` is monotonic, enabling binary search. Once we find the right segment, offset from the left boundary.
