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

Given two integer arrays that may contain zeros, replace each zero with a **positive integer**. Determine the minimum possible equal sum that both arrays can achieve after replacement, or return `-1` if it is impossible.

---

## Examples

**Example 1:**
```
Input: nums1 = [0,2,3], nums2 = [1,0]
Output: 6
Explanation: Replace zeros with 1 and 3 respectively. Both arrays sum to 6.
```

**Example 2:**
```
Input: nums1 = [5,0], nums2 = [3,4]
Output: -1
Explanation: nums2 has no zeros and its sum is 7. nums1 minimum possible sum is 5+1=6, cannot reach 7.
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