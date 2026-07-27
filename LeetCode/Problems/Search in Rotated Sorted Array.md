
# 33. Search in Rotated Sorted Array

**Difficulty:** 🟡 Medium
**Acceptance:** 44.9%
**LeetCode:** [https://leetcode.com/problems/search-in-rotated-sorted-array](https://leetcode.com/problems/search-in-rotated-sorted-array)
**Companies:** Accenture, Adobe, Amazon, Anduril, Apple, Arista Networks, Autodesk, Bloomberg, Bytedance, Cisco, Cohesity, Criteo, Dp World, F5 Networks, Flipkart, Gainsight, Goldman Sachs, Google, Grammarly, Ibm, Infosys, Josh Technology, Linkedin, Meta, Microsoft, Mongodb, Myntra, Newsbreak, Nutanix, Nvidia, Oracle, Palo Alto Networks, Paypal, Paytm, Salesforce, Samsung, Sap, Sixt, Snapchat, Tcs, Tiktok, Tinkoff, Uber, Walmart Labs, Wish, Yahoo, Yandex, Zepto, Zoho, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: Modified Binary Search — O(log n) ✅](#4-solution-modified-binary-search--olog-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

An integer array `nums` sorted in ascending order is **rotated** at some unknown pivot index `k`. For example, `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`.

Given the rotated array and a `target`, return the index of `target` if found, or `-1` otherwise.

You must write an algorithm with **O(log n)** runtime.

**Constraint:** All values are **unique**.

---

## 2. Examples

```
Example 1:
  Input:  nums = [4,5,6,7,0,1,2], target = 0
  Output: 4

Example 2:
  Input:  nums = [4,5,6,7,0,1,2], target = 3
  Output: -1

Example 3:
  Input:  nums = [1], target = 0
  Output: -1
```

---

## 3. Key Insight

In a rotated sorted array, at any midpoint, **one half is always sorted**:

```
[4, 5, 6, 7, 0, 1, 2]
         mid
 ↑ sorted ↑     ↑ has rotation ↑
```

If we can determine which half is sorted, we can check if the target falls within that sorted range. If yes, search there; otherwise, search the other half.

---

## 4. Solution: Modified Binary Search — O(log n) ✅

```
FUNCTION search(nums, target):
    lo = 0
    hi = LENGTH(nums) - 1

    WHILE lo <= hi:
        mid = (lo + hi) / 2

        IF nums[mid] == target:
            RETURN mid

        // Left half is sorted
        IF nums[lo] <= nums[mid]:
            IF nums[lo] <= target < nums[mid]:
                hi = mid - 1                    // target is in sorted left half
            ELSE:
                lo = mid + 1                    // target is in right half

        // Right half is sorted
        ELSE:
            IF nums[mid] < target <= nums[hi]:
                lo = mid + 1                    // target is in sorted right half
            ELSE:
                hi = mid - 1                    // target is in left half

    RETURN -1
```

### Decision Logic

At each step:
1. Check if `nums[mid] == target` → found.
2. Determine which half is sorted by comparing `nums[lo]` with `nums[mid]`.
3. Check if target falls within the sorted half's range.
4. Eliminate the other half.

---

## 5. Walkthrough

```
nums = [4, 5, 6, 7, 0, 1, 2], target = 0
        0  1  2  3  4  5  6

lo=0, hi=6

Iteration 1:
  mid = 3, nums[3] = 7 ≠ 0
  nums[0]=4 <= nums[3]=7 → left half [4,5,6,7] is sorted
  Is 4 <= 0 < 7?  NO
  → Search right: lo = 4

Iteration 2:
  lo=4, hi=6, mid=5, nums[5]=1 ≠ 0
  nums[4]=0 <= nums[5]=1 → left half [0,1] is sorted
  Is 0 <= 0 < 1?  YES
  → Search left: hi = 4

Iteration 3:
  lo=4, hi=4, mid=4, nums[4]=0 == target
  RETURN 4 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

### 7.1 What if duplicates are allowed? (LeetCode #81)

With duplicates, when `nums[lo] == nums[mid]`, we can't determine which half is sorted. In that case, shrink: `lo += 1`.

```
FUNCTION search(nums, target):
    lo = 0
    hi = LENGTH(nums) - 1

    WHILE lo <= hi:
        mid = (lo + hi) / 2

        IF nums[mid] == target:
            RETURN TRUE

        // Can't determine sorted half — shrink
        IF nums[lo] == nums[mid]:
            lo += 1
            CONTINUE

        IF nums[lo] <= nums[mid]:
            IF nums[lo] <= target < nums[mid]:
                hi = mid - 1
            ELSE:
                lo = mid + 1
        ELSE:
            IF nums[mid] < target <= nums[hi]:
                lo = mid + 1
            ELSE:
                hi = mid - 1

    RETURN FALSE
```

**Worst case:** O(n) when all elements are the same except one.

---

### 7.2 Find Minimum in Rotated Sorted Array (LeetCode #153)

```
FUNCTION findMin(nums):
    lo = 0
    hi = LENGTH(nums) - 1

    WHILE lo < hi:
        mid = (lo + hi) / 2

        IF nums[mid] > nums[hi]:
            lo = mid + 1          // min is in right half
        ELSE:
            hi = mid              // min is in left half (including mid)

    RETURN nums[lo]
```

### 7.3 Find the Rotation Point (Pivot)

The rotation point is where `nums[i] > nums[i+1]`. This is equivalent to finding the minimum (the element right after the pivot).

### 7.4 Two-Pass Approach: Find Pivot, Then Binary Search

```
FUNCTION search(nums, target):
    pivot = findMin_index(nums)        // O(log n)

    IF target >= nums[0]:
        RETURN binarySearch(nums, 0, pivot - 1, target)
    ELSE:
        RETURN binarySearch(nums, pivot, n - 1, target)
```

This is conceptually cleaner but requires two binary searches. The single-pass approach above is more efficient in practice.

---

## Binary Search Variants Family

| Problem | Variation | Time |
|---------|-----------|------|
| **Classic Binary Search** | Sorted array | O(log n) |
| **Search Rotated** (#33) | Unique + rotated | O(log n) |
| **Search Rotated II** (#81) | Duplicates + rotated | O(n) worst |
| **Find Min Rotated** (#153) | Find pivot | O(log n) |
| **Find Min Rotated II** (#154) | Duplicates | O(n) worst |
| **Search 2D Matrix** (#74) | Flattened sorted | O(log(mn)) |

---

## Key Takeaway

> The key to rotated array problems is recognizing that **one half is always sorted**. Use this invariant to decide which half to eliminate. This is a common interview pattern: modifying binary search for non-standard settings. The core principle — **eliminate half the search space per iteration** — still applies.
