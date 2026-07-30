# 26. Remove Duplicates from Sorted Array

**Difficulty:** 🟢 Easy
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-array](https://leetcode.com/problems/remove-duplicates-from-sorted-array)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Capgemini, Cisco, Cognizant, Deloitte, Epam Systems, Goldman Sachs, Google, Ibm, Impetus, Infosys, Meta, Microsoft, Morgan Stanley, Myntra, Oracle, Qualcomm, Siemens, Tcs, Uber, Udemy, Walmart Labs, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Two Pointers — O(n) ✅](#3-approach-two-pointers--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given a sorted array `nums`, remove the duplicates **in-place** such that each element appears only once. Return the number of unique elements.

The first `k` elements of `nums` should hold the unique elements in order. Elements beyond `k` don't matter.

**Constraints:**
- `1 <= nums.length <= 3 × 10⁴`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order.

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,1,2]
  Output: 2, nums = [1,2,_]

Example 2:
  Input:  nums = [0,0,1,1,1,2,2,3,3,4]
  Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
```

---

## 3. Approach: Two Pointers — O(n) ✅

`slow` tracks the write position. `fast` scans forward. When `fast` finds a new value, write it at `slow`.

```
FUNCTION removeDuplicates(nums):
    IF nums is empty: RETURN 0

    slow = 0

    FOR fast ← 1 TO n - 1:
        IF nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]

    RETURN slow + 1
```

---

## 4. Walkthrough

```
nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
slow = 0

fast=1: 0 == 0 → skip
fast=2: 1 != 0 → slow=1, nums[1]=1
fast=3: 1 == 1 → skip
fast=4: 1 == 1 → skip
fast=5: 2 != 1 → slow=2, nums[2]=2
fast=6: 2 == 2 → skip
fast=7: 3 != 2 → slow=3, nums[3]=3
fast=8: 3 == 3 → skip
fast=9: 4 != 3 → slow=4, nums[4]=4

Return 5, nums = [0,1,2,3,4,...] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Remove Duplicates II (LeetCode #80) — allow at most 2?

Change condition: write if `fast != nums[slow-1]` (compare with element 2 positions back).

```
FUNCTION removeDuplicates2(nums):
    IF len(nums) <= 2: RETURN len(nums)
    slow = 2
    FOR fast ← 2 TO n - 1:
        IF nums[fast] != nums[slow - 2]:
            nums[slow] = nums[fast]
            slow += 1
    RETURN slow
```

### 6.2 Remove Element (LeetCode #27)?

Same two-pointer, but remove a specific value instead of duplicates.

### 6.3 Move Zeroes (LeetCode #283)?

Same reader-writer pattern with swap instead of overwrite.

---

## Key Takeaway

> The **slow/fast pointer** technique is the standard for in-place array deduplication on sorted arrays. `slow` marks the boundary of the "clean" portion; `fast` finds the next unique element.
