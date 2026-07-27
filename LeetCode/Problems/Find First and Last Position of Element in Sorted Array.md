
# 34. Find First and Last Position of Element in Sorted Array

**Difficulty:** 🟡 Medium
**Acceptance:** 48.9%
**LeetCode:** [https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array)
**Companies:** Accenture, Airtel, Amazon, Apple, Applied Intuition, Atlassian, Attentive, Bloomberg, Capgemini, Citadel, De Shaw, Goldman Sachs, Google, Infosys, Instacart, Linkedin, Meta, Microsoft, Oracle, Paypal, Pinterest, Splunk, Tcs, Tekion, Tiktok, Tinkoff, Turing, Uber, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Solution: Two Binary Searches — O(log n) ✅](#3-solution-two-binary-searches--olog-n-)
4. [Walkthrough](#5-walkthrough)
5. [Complexity Analysis](#6-complexity-analysis)
6. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given a sorted array of integers `nums` and a target value, find the **starting and ending position** of `target`. If not found, return `[-1, -1]`.

You must write an algorithm with **O(log n)** runtime.

---

## 2. Examples

```
Example 1:
  Input:  nums = [5,7,7,8,8,10], target = 8
  Output: [3, 4]

Example 2:
  Input:  nums = [5,7,7,8,8,10], target = 6
  Output: [-1, -1]

Example 3:
  Input:  nums = [], target = 0
  Output: [-1, -1]
```

---

## 3. Solution: Two Binary Searches — O(log n) ✅

Run binary search twice: once to find the **leftmost** occurrence, once for the **rightmost**.

```
FUNCTION searchRange(nums, target):
    left  = findFirst(nums, target)
    right = findLast(nums, target)
    RETURN [left, right]


FUNCTION findFirst(nums, target):
    lo = 0, hi = LENGTH(nums) - 1
    result = -1

    WHILE lo <= hi:
        mid = (lo + hi) / 2

        IF nums[mid] == target:
            result = mid
            hi = mid - 1            // keep searching left

        ELSE IF nums[mid] < target:
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN result


FUNCTION findLast(nums, target):
    lo = 0, hi = LENGTH(nums) - 1
    result = -1

    WHILE lo <= hi:
        mid = (lo + hi) / 2

        IF nums[mid] == target:
            result = mid
            lo = mid + 1            // keep searching right

        ELSE IF nums[mid] < target:
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN result
```

### Key Difference

- **findFirst:** When `target` is found, move `hi = mid - 1` to search further left.
- **findLast:** When `target` is found, move `lo = mid + 1` to search further right.

---

## 4. Walkthrough

```
nums = [5, 7, 7, 8, 8, 10], target = 8

findFirst(8):
  lo=0, hi=5, mid=2: nums[2]=7 < 8 → lo=3
  lo=3, hi=5, mid=4: nums[4]=8 == 8 → result=4, hi=3
  lo=3, hi=3, mid=3: nums[3]=8 == 8 → result=3, hi=2
  lo=3 > hi=2 → DONE
  Return 3

findLast(8):
  lo=0, hi=5, mid=2: nums[2]=7 < 8 → lo=3
  lo=3, hi=5, mid=4: nums[4]=8 == 8 → result=4, lo=5
  lo=5, hi=5, mid=5: nums[5]=10 > 8 → hi=4
  lo=5 > hi=4 → DONE
  Return 4

Result: [3, 4] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) — two binary searches |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Count occurrences of a target

```
count = findLast(target) - findFirst(target) + 1
```

If `findFirst` returns -1, count is 0.

### 6.2 bisect_left / bisect_right (lower_bound / upper_bound)

These are the generalized versions:

```
FUNCTION bisectLeft(nums, target):
    lo = 0, hi = LENGTH(nums)
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF nums[mid] < target:
            lo = mid + 1
        ELSE:
            hi = mid
    RETURN lo                    // first index where nums[i] >= target

FUNCTION bisectRight(nums, target):
    lo = 0, hi = LENGTH(nums)
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF nums[mid] <= target:
            lo = mid + 1
        ELSE:
            hi = mid
    RETURN lo                    // first index where nums[i] > target
```

Then: `first = bisectLeft`, `last = bisectRight - 1`.

### 6.3 Search Insert Position (LeetCode #35)

Find where to insert `target` to keep sorted order. This is exactly `bisect_left`.

### 6.4 Binary search on answer (conceptual pattern)

Many problems use binary search not on arrays but on the **answer space**:
- Koko Eating Bananas (#875)
- Capacity to Ship Packages (#1011)
- Split Array Largest Sum (#410)

The pattern: binary search on a range of possible answers, check feasibility with a greedy/linear scan.

---

## Key Takeaway

> This problem teaches the two fundamental binary search variants: **find leftmost** and **find rightmost**. The only difference is what you do when `nums[mid] == target` — continue searching left (for first) or right (for last). Mastering these two patterns (equivalent to `bisect_left` and `bisect_right`) unlocks a huge family of binary search problems.
