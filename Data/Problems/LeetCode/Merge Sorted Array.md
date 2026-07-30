# 88. Merge Sorted Array

**Difficulty:** 🟢 Easy
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/merge-sorted-array](https://leetcode.com/problems/merge-sorted-array)
**Companies:** Accenture, Amazon, Amd, Apple, Avito, Bloomberg, Bny Mellon, Canonical, Cisco, Cognizant, De Shaw, Epam Systems, Goldman Sachs, Google, Hcl, Hubspot, Ibm, Infosys, Linkedin, Meta, Microsoft, Motive, Nvidia, Oracle, Palo Alto Networks, Paypal, Persistent Systems, Qualcomm, Samsung, Squarespace, Swiggy, Tcs, Tiktok, Verkada, Visa, Wipro, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Three Pointers from End — O(m+n) ✅](#3-approach-three-pointers-from-end--omn-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

Merge `nums2` into `nums1` as one sorted array **in-place**.

`nums1` has a length of `m + n`, where the last `n` elements are set to `0` and should be ignored.

**Constraints:**
- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`

---

## 2. Examples

```
Example 1:
  Input:  nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
  Output: [1,2,2,3,5,6]

Example 2:
  Input:  nums1 = [1], m = 1, nums2 = [], n = 0
  Output: [1]
```

---

## 3. Approach: Three Pointers from End — O(m+n) ✅

### Key Insight

Merge from the **end** of `nums1` to avoid overwriting elements we haven't processed yet. Compare the largest remaining elements from both arrays and place them at the back.

```
FUNCTION merge(nums1, m, nums2, n):

    i = m - 1          // pointer for nums1's actual elements
    j = n - 1          // pointer for nums2
    k = m + n - 1      // write pointer at the end of nums1

    WHILE i >= 0 AND j >= 0:
        IF nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        ELSE:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1

    // Copy remaining elements from nums2 (if any)
    WHILE j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1
```

### Why No Copy of Remaining nums1?

If `j < 0` but `i >= 0`, the remaining `nums1` elements are already in their correct positions.

---

## 4. Walkthrough

```
nums1 = [1,2,3,0,0,0], m=3, nums2 = [2,5,6], n=3

i=2, j=2, k=5: nums1[2]=3 vs nums2[2]=6 → 6 wins → nums1[5]=6, j=1, k=4
i=2, j=1, k=4: nums1[2]=3 vs nums2[1]=5 → 5 wins → nums1[4]=5, j=0, k=3
i=2, j=0, k=3: nums1[2]=3 vs nums2[0]=2 → 3 wins → nums1[3]=3, i=1, k=2
i=1, j=0, k=2: nums1[1]=2 vs nums2[0]=2 → 2 wins → nums1[2]=2, j=-1, k=1

j < 0 → done. nums1 = [1,2,2,3,5,6] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m + n) |
| **Space** | O(1) — in-place |

---

## 6. Follow-Up Questions

### 6.1 What if nums1 doesn't have extra space?

You'd need O(n) extra space or merge into a new array.

### 6.2 Merge Two Sorted Lists (LeetCode #21)?

Same concept with linked lists. Use a dummy head and compare nodes.

### 6.3 Squares of a Sorted Array (LeetCode #977)?

Array may have negatives. Square all elements, then merge from both ends (largest squares are at the extremes) using two pointers.

### 6.4 What about k sorted arrays?

Use a min-heap of size k. Push the smallest remaining element from each array. Pop min, push next from that array. O(N log k) total.

---

## Key Takeaway

> **Merge from the end** is the key trick for in-place sorted array merging. It guarantees we never overwrite unprocessed elements. This pattern generalizes to any in-place merge where one array has extra capacity.
