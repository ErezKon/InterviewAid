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

Given two integer arrays `nums1` and `nums2` of the same length, at each index you can swap `nums1[i]` and `nums2[i]`. Return the **minimum** swaps to make both arrays **strictly increasing**.

**Constraints:**
- `2 <= nums.length <= 10⁵`
- It's guaranteed a valid answer exists

---

## 2. Examples

```
Example 1:
  Input: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
  Output: 1
  Explanation: Swap at index 3: nums1=[1,3,5,7], nums2=[1,2,3,4]. Both increasing.
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
