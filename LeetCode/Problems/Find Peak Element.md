# 162. Find Peak Element

**Difficulty:** 🟡 Medium
**Acceptance:** 46.0%
**LeetCode:** [https://leetcode.com/problems/find-peak-element](https://leetcode.com/problems/find-peak-element)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Bytedance, Commvault, Docusign, Ebay, Flipkart, Goldman Sachs, Google, Infosys, Ixl, Meta, Microsoft, Netflix, Nvidia, Oracle, Paypal, Samsung, Servicenow, Tcs, Tekion, Tiktok, Uber, Urban Company, Visa, Walmart Labs, Waymo, Wix, Yahoo, Zepto, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Binary Search — O(log n) ✅](#3-approach-binary-search--olog-n-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

A **peak element** is an element strictly greater than its neighbors.

Given a 0-indexed integer array `nums`, find a peak element and return its index. If the array contains multiple peaks, return the index to **any** of the peaks.

You may imagine that `nums[-1] = nums[n] = -∞`.

You must write an algorithm that runs in **O(log n)** time.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `nums[i] != nums[i + 1]` for all valid `i`.

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,2,3,1]
  Output: 2
  Reason: nums[2] = 3 is a peak (3 > 2 and 3 > 1).

Example 2:
  Input:  nums = [1,2,1,3,5,6,4]
  Output: 5 (or 1)
  Reason: nums[5] = 6 is a peak. nums[1] = 2 is also a peak.
```

---

## 3. Approach: Binary Search — O(log n) ✅

### Key Insight

If `nums[mid] < nums[mid + 1]`, a peak must exist on the right side (because values keep increasing, and `nums[n] = -∞` forces a downturn). Similarly, if `nums[mid] < nums[mid - 1]`, a peak exists on the left.

```
FUNCTION findPeakElement(nums):
    lo = 0
    hi = len(nums) - 1

    WHILE lo < hi:
        mid = (lo + hi) / 2

        IF nums[mid] < nums[mid + 1]:
            lo = mid + 1       // peak is on the right
        ELSE:
            hi = mid           // mid could be the peak

    RETURN lo
```

---

## 4. Walkthrough

```
nums = [1, 2, 1, 3, 5, 6, 4]

lo=0, hi=6
mid=3: nums[3]=3 < nums[4]=5 → lo=4
mid=5: nums[5]=6 > nums[6]=4 → hi=5
lo=4, hi=5
mid=4: nums[4]=5 < nums[5]=6 → lo=5
lo=5 == hi=5 → RETURN 5 ✅ (nums[5]=6 is a peak)
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 What if adjacent elements can be equal?

Binary search doesn't work directly — you can't determine which side has the peak. Fall back to O(n) linear scan, or modify to skip equal elements.

### 6.2 Find Peak Element in 2D matrix?

Search column by column. For the middle column, find the row maximum. Compare with neighbors in adjacent columns to determine which half contains a 2D peak. O(n log m) or O(m log n).

### 6.3 Peak Index in a Mountain Array (LeetCode #852)?

Guaranteed unimodal (increases then decreases). Same binary search — if `arr[mid] < arr[mid+1]`, go right; else go left. Find the single peak.

---

## Key Takeaway

> Binary search works for peak finding because the boundary condition (`nums[-1] = nums[n] = -∞`) guarantees a peak exists on the "ascending" side. This demonstrates that binary search applies beyond sorted arrays — it works whenever you can halve the search space based on a condition.
