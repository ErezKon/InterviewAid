
# 4. Median of Two Sorted Arrays

**Difficulty:** 🔴 Hard
**Acceptance:** 46.6%
**LeetCode:** [https://leetcode.com/problems/median-of-two-sorted-arrays](https://leetcode.com/problems/median-of-two-sorted-arrays)
**Companies:** Accenture, Adobe, Amazon, Apple, Arcesium, Autodesk, Bloomberg, Capgemini, Cognizant, De Shaw, Dropbox, Epam Systems, Flipkart, Ge Healthcare, Goldman Sachs, Google, Ibm, Meta, Microsoft, Nvidia, Okta, Oracle, Palo Alto Networks, Paypal, Pwc, Qualcomm, Rippling, Salesforce, Samsung, Servicenow, Swiggy, Tcs, Tesla, Tiktok, Turing, Uber, Udemy, Visa, Walmart Labs, Wix, Yahoo, Yandex, Zenefits, Zeta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Merge and Find — O(m + n)](#3-approach-1-merge-and-find--om--n)
4. [Approach 2: Binary Search — O(log(min(m, n))) ✅](#4-approach-2-binary-search--ologminm-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the **median** of the two sorted arrays.

The overall run time complexity should be **O(log(m + n))**.

---

## 2. Examples

```
Example 1:
  Input:  nums1 = [1, 3], nums2 = [2]
  Merged: [1, 2, 3]
  Output: 2.0

Example 2:
  Input:  nums1 = [1, 2], nums2 = [3, 4]
  Merged: [1, 2, 3, 4]
  Output: 2.5   (average of 2 and 3)
```

---

## 3. Approach 1: Merge and Find — O(m + n)

Merge both arrays (like merge sort), then pick the middle element(s).

```
FUNCTION findMedianMerge(nums1, nums2):
    merged = merge(nums1, nums2)
    total  = LENGTH(merged)

    IF total IS ODD:
        RETURN merged[total / 2]
    ELSE:
        RETURN (merged[total/2 - 1] + merged[total/2]) / 2.0
```

**Time:** O(m + n), **Space:** O(m + n)
Doesn't meet the O(log(m + n)) requirement.

---

## 4. Approach 2: Binary Search — O(log(min(m, n))) ✅

### Core Idea

The median splits the combined elements into two equal halves. We need to find a **partition** of both arrays such that:

1. Left half has exactly `(m + n + 1) / 2` elements.
2. Every element in the left half ≤ every element in the right half.

```
Array A:   a1, a2, ..., a_i  |  a_{i+1}, ..., a_m
Array B:   b1, b2, ..., b_j  |  b_{j+1}, ..., b_n
           ← LEFT HALF →       ← RIGHT HALF →

Constraints:
  i + j = (m + n + 1) / 2        (equal split)
  A[i-1] ≤ B[j]                  (left elements ≤ right elements)
  B[j-1] ≤ A[i]
```

Since `j` is determined by `i` (j = half - i), we only binary search on `i` in the **shorter** array.

### Pseudocode

```
FUNCTION findMedianSortedArrays(nums1, nums2):

    // Ensure nums1 is the shorter array
    IF LENGTH(nums1) > LENGTH(nums2):
        SWAP(nums1, nums2)

    m = LENGTH(nums1)
    n = LENGTH(nums2)
    half = (m + n + 1) / 2          // integer division

    lo = 0
    hi = m

    WHILE lo <= hi:
        i = (lo + hi) / 2           // partition index in nums1
        j = half - i                // partition index in nums2

        // Handle edge cases with -∞ and +∞
        leftA  = nums1[i - 1] IF i > 0 ELSE -INFINITY
        rightA = nums1[i]     IF i < m ELSE +INFINITY
        leftB  = nums2[j - 1] IF j > 0 ELSE -INFINITY
        rightB = nums2[j]     IF j < n ELSE +INFINITY

        IF leftA <= rightB AND leftB <= rightA:
            // Valid partition found
            IF (m + n) IS ODD:
                RETURN MAX(leftA, leftB)
            ELSE:
                RETURN (MAX(leftA, leftB) + MIN(rightA, rightB)) / 2.0

        ELSE IF leftA > rightB:
            hi = i - 1              // Too many from A on the left, move left

        ELSE:
            lo = i + 1              // Too few from A on the left, move right

    // Should never reach here with valid input
```

### Why Binary Search on the Shorter Array?

- Reduces search space to O(log(min(m, n))).
- Guarantees `j = half - i` is always valid (j ≥ 0 and j ≤ n).

---

## 5. Walkthrough

```
nums1 = [1, 3, 8]     m = 3
nums2 = [7, 9, 10, 11] n = 4
total = 7 (odd), half = 4

Binary search on nums1:  lo=0, hi=3

Iteration 1:  i = 1, j = 4 - 1 = 3
  leftA  = nums1[0] = 1     rightA = nums1[1] = 3
  leftB  = nums2[2] = 10    rightB = nums2[3] = 11
  leftA(1) <= rightB(11) ✓
  leftB(10) <= rightA(3)?  10 > 3  ✗
  → Too few from A → lo = 2

Iteration 2:  i = 2, j = 4 - 2 = 2
  leftA  = nums1[1] = 3     rightA = nums1[2] = 8
  leftB  = nums2[1] = 9     rightB = nums2[2] = 10
  leftA(3) <= rightB(10) ✓
  leftB(9) <= rightA(8)?  9 > 8  ✗
  → Too few from A → lo = 3

Iteration 3:  i = 3, j = 4 - 3 = 1
  leftA  = nums1[2] = 8     rightA = +∞ (i == m)
  leftB  = nums2[0] = 7     rightB = nums2[1] = 9
  leftA(8) <= rightB(9) ✓
  leftB(7) <= rightA(+∞) ✓
  → Valid partition!
  Odd total → RETURN MAX(8, 7) = 8

Verify: merged = [1, 3, 7, 8, 9, 10, 11]  → median = 8 ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Merge and Find | O(m + n) | O(m + n) |
| **Binary Search** | **O(log(min(m, n)))** | **O(1)** |

---

## 7. Follow-Up Questions

### 7.1 Why use -∞ and +∞ for boundaries?

When `i = 0`, no elements from `nums1` are in the left half. We need `leftA` to never violate `leftA ≤ rightB`, so we set it to `-∞`. Similarly, when `i = m`, all elements from `nums1` are in the left half, so `rightA = +∞` to never violate `leftB ≤ rightA`.

### 7.2 What if one array is empty?

The median is simply the middle of the non-empty array. The algorithm handles this naturally — the binary search on the empty array has `lo = hi = 0`.

### 7.3 Can you find the kth element instead of the median?

Yes. Generalize to **"find the kth smallest element in two sorted arrays"**:

```
FUNCTION findKth(nums1, nums2, k):
    // Similar binary search: partition so left half has exactly k elements
    // Binary search on the shorter array
    // Same boundary logic with -∞ / +∞
```

The median is just the special case where k = (m + n + 1) / 2.

### 7.4 What about more than 2 sorted arrays?

For `k` sorted arrays, use a **min-heap** (priority queue) that holds the current smallest element from each array. Pop `(m+n)/2` times to find the median. Time: O((m+n)/2 · log k).

---

## Key Takeaway

> This is one of the hardest "classic" problems. The key insight is reframing **"find the median"** as **"find the correct partition point"** — then binary search becomes applicable. The partition must satisfy: all left elements ≤ all right elements, and the left half contains exactly half the total elements.
