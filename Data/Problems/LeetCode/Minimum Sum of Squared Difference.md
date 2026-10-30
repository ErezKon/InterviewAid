# 2333. Minimum Sum of Squared Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-sum-of-squared-difference](https://leetcode.com/problems/minimum-sum-of-squared-difference)

**Companies:** Amazon, Microsoft, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Greedy Leveling — O(n log n)](#4-approach-sort--greedy-leveling--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given two positive **0-indexed** integer arrays `nums1` and `nums2`, both of length `n`.

The **sum of squared difference** of arrays `nums1` and `nums2` is defined as the **sum** of `(nums1[i] - nums2[i])^2` for each `0 <= i < n`.

You are also given two positive integers `k1` and `k2`. You can modify any of the elements of `nums1` by `+1` or `-1` at most `k1` times. Similarly, you can modify any of the elements of `nums2` by `+1` or `-1` at most `k2` times.

Return *the minimum **sum of squared difference** after modifying array *`nums1`* at most *`k1`* times and modifying array *`nums2`* at most *`k2`* times*.

**Note**: You are allowed to modify the array elements to become **negative** integers.

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `0 <= nums1[i], nums2[i] <= 10^5`
- `0 <= k1, k2 <= 10^9`

---

## 2. Examples

**Example 1:**
```
Input: nums1 = [1,2,3,4], nums2 = [2,10,20,19], k1 = 0, k2 = 0
Output: 579
Explanation: The elements in nums1 and nums2 cannot be modified because k1 = 0 and k2 = 0.
The sum of square difference will be: (1 - 2)^2 + (2 - 10)^2 + (3 - 20)^2 + (4 - 19)^2 = 579.
```

**Example 2:**
```
Input: nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1
Output: 43
Explanation: One way to obtain the minimum sum of square difference is:
- Increase nums1[0] once.
- Increase nums2[2] once.
The minimum of the sum of square difference will be:
(2 - 5)^2 + (4 - 8)^2 + (10 - 7)^2 + (12 - 9)^2 = 43.
Note that, there are other ways to obtain the minimum of the sum of square difference, but there is no way to obtain a sum smaller than 43.
```

---

## 3. Key Insight

> Compute `diffs[i] = |nums1[i] - nums2[i]|`. Total budget = `k1 + k2`. To minimize sum of squares, **reduce the largest diffs first** — squaring penalizes large values disproportionately. Level the largest values down toward the next-largest value.

---

## 4. Approach: Sort + Greedy Leveling — O(n log n) ✅

```
FUNCTION minSumSquaredDiff(nums1, nums2, k1, k2):
    k = k1 + k2
    diffs = [|nums1[i] - nums2[i]| for i in range(n)]
    SORT diffs DESC

    FOR i ← 0 TO n - 1:
        // Level diffs[i] down to diffs[i+1] (or 0 for last)
        nextVal = diffs[i+1] IF i+1 < n ELSE 0
        gap = diffs[i] - nextVal
        need = gap * (i + 1)  // reduce all top (i+1) values by gap

        IF need <= k:
            k -= need
            FOR j ← 0 TO i: diffs[j] = nextVal
        ELSE:
            // Partial reduction
            reduce = k // (i + 1)
            remainder = k % (i + 1)
            FOR j ← 0 TO i: diffs[j] -= reduce
            FOR j ← 0 TO remainder - 1: diffs[j] -= 1
            k = 0
            BREAK

    RETURN SUM(d * d for d in diffs)
```

---

## 5. Walkthrough

```
nums1=[1,4,10,12], nums2=[5,8,6,9], k1=1, k2=1
diffs = [4,4,4,3], k=2

Sorted desc: [4,4,4,3]
i=0: next=4, gap=0. Skip.
i=1: next=4, gap=0. Skip.
i=2: next=3, gap=1, need=3 > k=2.
  reduce=2//3=0, remainder=2. diffs[0]-=1=3, diffs[1]-=1=3.
  diffs = [3,3,4,3]... 

Actually after sorting: reduce top 3 values from 4 to 3 costs 3, but k=2.
Partial: reduce=0, remainder=2. Two of the three drop by 1.
diffs = [3,3,4,3] → sum = 9+9+16+9 = 43.
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(n) — diffs array |

---

## 7. Key Takeaway

> **Reduce the largest differences first** — squaring penalizes large values quadratically. Level the top values down greedily. This "leveling" pattern appears in many minimize-sum-of-squares problems.
