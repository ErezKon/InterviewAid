# 2918. Minimum Equal Sum of Two Arrays After Replacing Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros](https://leetcode.com/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros)
**Companies:** Amazon, Google, Mathworks, Salesforce, Squarepoint Capital
---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two arrays `nums1` and `nums2` consisting of positive integers.

You have to replace **all** the `0`'s in both arrays with **strictly** positive integers such that the sum of elements of both arrays becomes **equal**.

Return *the **minimum** equal sum you can obtain, or *`-1`* if it is impossible*.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 10^5`
- `0 <= nums1[i], nums2[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums1 = [3,2,0,1,0], nums2 = [6,5,0]
Output: 12
Explanation: We can replace 0's in the following way:
- Replace the two 0's in nums1 with the values 2 and 4. The resulting array is nums1 = [3,2,2,1,4].
- Replace the 0 in nums2 with the value 1. The resulting array is nums2 = [6,5,1].
Both arrays have an equal sum of 12. It can be shown that it is the minimum sum we can obtain.
```

**Example 2:**
```
Input: nums1 = [2,0,2,0], nums2 = [1,4]
Output: -1
Explanation: It is impossible to make the sum of both arrays equal.
```

---

## Approach: Greedy — O(n) ✅

```text
FUNCTION minEqualSum(nums1, nums2):
    s1 ← SUM(nums1); z1 ← COUNT_ZERO(nums1)
    s2 ← SUM(nums2); z2 ← COUNT_ZERO(nums2)
    min1 ← s1 + z1   // each zero becomes at least 1
    min2 ← s2 + z2
    IF min1 > min2:
        IF z2 = 0: RETURN -1
        RETURN min1
    ELSE IF min2 > min1:
        IF z1 = 0: RETURN -1
        RETURN min2
    RETURN min1
```

---

## Walkthrough

Consider `nums1 = [0,2,3]`, `nums2 = [1,0]`.

| Array | Sum | Zeros | Minimum Floor |
|-------|-----|-------|---------------|
| nums1 | 5   | 1     | 5 + 1 = 6 |
| nums2 | 1   | 1     | 1 + 1 = 2 |

`min1` (6) > `min2` (2). `nums2` has a zero, so we can increase its sum to 6 by setting its zero to 5. Both arrays achieve sum 6.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n + m)** | **O(1)** |

---

## Key Takeaway

> Replace zeros with the smallest possible positive integers to compute each array's minimum achievable sum; the larger minimum floor is the target equal sum, provided the other array can be increased via its zeros.

---