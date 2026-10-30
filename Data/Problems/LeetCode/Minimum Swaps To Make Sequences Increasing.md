# 801. Minimum Swaps To Make Sequences Increasing

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing](https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing)
**Companies:** Amazon, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n)](#4-approach-dp--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given two integer arrays of the same length `nums1` and `nums2`. In one operation, you are allowed to swap `nums1[i]` with `nums2[i]`.

- For example, if `nums1 = [1,2,3,8]`, and `nums2 = [5,6,7,4]`, you can swap the element at `i = 3` to obtain `nums1 = [1,2,3,4]` and `nums2 = [5,6,7,8]`.

Return *the minimum number of needed operations to make *`nums1`* and *`nums2`* **strictly increasing***. The test cases are generated so that the given input always makes it possible.

An array `arr` is **strictly increasing** if and only if `arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1]`.

**Constraints:**
- `2 <= nums1.length <= 10^5`
- `nums2.length == nums1.length`
- `0 <= nums1[i], nums2[i] <= 2 * 10^5`

---

## 2. Examples

**Example 1:**
```
Input: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
Output: 1
Explanation: Swap nums1[3] and nums2[3]. Then the sequences are:
nums1 = [1, 3, 5, 7] and nums2 = [1, 2, 3, 4]
which are both strictly increasing.
```

**Example 2:**
```
Input: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
Output: 1
```

---

## 3. Key Insight

> At each position, decide swap or no-swap. Track two DP states: `noSwap` = min swaps if we don't swap at `i`, `swap` = min swaps if we swap at `i`. Transitions depend on whether the natural order or crossed order is valid.

---

## 4. Approach: DP — O(n) ✅

```
FUNCTION minSwap(nums1, nums2):
    noSwap = 0; swap = 1
    FOR i ← 1 TO n - 1:
        newNoSwap = newSwap = infinity
        IF nums1[i] > nums1[i-1] AND nums2[i] > nums2[i-1]:
            newNoSwap = MIN(newNoSwap, noSwap)
            newSwap = MIN(newSwap, swap + 1)
        IF nums1[i] > nums2[i-1] AND nums2[i] > nums1[i-1]:
            newNoSwap = MIN(newNoSwap, swap)
            newSwap = MIN(newSwap, noSwap + 1)
        noSwap, swap = newNoSwap, newSwap
    RETURN MIN(noSwap, swap)
```

---

## 5. Walkthrough

```
nums1 = [1,3,5,4], nums2 = [1,2,3,7]
Initial: noSwap=0, swap=1

i=1: 3>1 & 2>1 → newNoSwap=0, newSwap=2
     3>1 & 2>1 → newNoSwap=min(0,1)=0, newSwap=min(2,0+1)=1
     → noSwap=0, swap=1

i=2: 5>3 & 3>2 → newNoSwap=0, newSwap=2
     5>2 & 3>3? NO (3>3 false)
     → noSwap=0, swap=2

i=3: 4>5? NO
     4>3 & 7>5 → newNoSwap=min(inf,2)=2, newSwap=min(inf,0+1)=1
     → noSwap=2, swap=1

Answer = min(2,1) = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) — two variables |

---

## 7. Key Takeaway

> **Two-state DP (swap/no-swap)** — at each position, the decision depends on whether natural ordering or crossed ordering is valid relative to the previous position's state. O(1) space with rolling variables.
