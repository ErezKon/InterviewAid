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

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an integer array `nums` which is sorted in **ascending order** and all of its elements are **unique** and given also an integer `k`, return the `k^th` missing number starting from the leftmost number of the array.

**Follow up:** Can you find a logarithmic time complexity (i.e., `O(log(n))`) solution?

**Constraints:**
- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^7`
- `nums` is sorted in **ascending order,** and all the elements are **unique**.
- `1 <= k <= 10^8`

---

## 2. Examples

**Example 1:**
```
Input: nums = [4,7,9,10], k = 1
Output: 5
Explanation: The first missing number is 5.
```

**Example 2:**
```
Input: nums = [4,7,9,10], k = 3
Output: 8
Explanation: The missing numbers are [5,6,8,...], hence the third missing number is 8.
```

**Example 3:**
```
Input: nums = [1,2,4], k = 3
Output: 6
Explanation: The missing numbers are [3,5,6,7,...], hence the third missing number is 6.
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
