# 1775. Equal Sum Arrays With Minimum Number of Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations](https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations)
**Companies:** American Express

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy with Gain Counting](#approach-greedy-with-gain-counting--on--m-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two arrays of integers `nums1` and `nums2`, possibly of different lengths. The values in the arrays are between 1 and 6, inclusive.

In one operation, you can change any integer's value in **any **of the arrays to **any** value between 1 and 6, inclusive.

Return the **minimum** number of operations required to make the sum of values in `nums1` equal to the sum of values in `nums2`. Return -1 if it is not possible to make the sum of the two arrays **equal**.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 10^5`
- `1 <= nums1[i], nums2[i] <= 6`

---

## Examples

**Example 1:**
```
Input: nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
Output: 3
Explanation: You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed.
- Change nums2[0] to 6. nums1 = [1,2,3,4,5,6], nums2 = [6,1,2,2,2,2].
- Change nums1[5] to 1. nums1 = [1,2,3,4,5,1], nums2 = [6,1,2,2,2,2].
- Change nums1[2] to 2. nums1 = [1,2,2,4,5,1], nums2 = [6,1,2,2,2,2].
```

**Example 2:**
```
Input: nums1 = [1,1,1,1,1,1,1], nums2 = [6]
Output: -1
Explanation: There is no way to decrease the sum of nums1 or to increase the sum of nums2 to make them equal.
```

**Example 3:**
```
Input: nums1 = [6,6], nums2 = [1]
Output: 3
Explanation: You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed.
- Change nums1[0] to 2. nums1 = [2,6], nums2 = [1].
- Change nums1[1] to 2. nums1 = [2,2], nums2 = [1].
- Change nums2[0] to 4. nums1 = [2,2], nums2 = [4].
```

---

## Key Insight

> Each element in the smaller-sum array can increase by at most `6 - val` and each in the larger-sum array can decrease by at most `val - 1`. Greedily pick the biggest possible gain first. Count how many gains of each size (1–5) are available, then consume from largest to smallest until the difference is covered.

---

## Approach: Greedy with Gain Counting — O(n + m) ✅

```
FUNCTION minOperations(nums1, nums2):
    sum1 = SUM(nums1); sum2 = SUM(nums2)
    IF sum1 == sum2: RETURN 0
    IF sum1 > sum2: SWAP(nums1, nums2)  // ensure sum1 < sum2

    diff = sum2 - sum1
    gains = [0] * 6  // gains[i] = count of operations giving gain i

    FOR v IN nums1: gains[6 - v] += 1   // can increase to 6
    FOR v IN nums2: gains[v - 1] += 1   // can decrease to 1

    ops = 0
    FOR g ← 5 DOWN TO 1:
        IF diff <= 0: BREAK
        use = MIN(gains[g], CEIL(diff / g))
        ops += use
        diff -= use * g

    RETURN ops IF diff <= 0 ELSE -1
```

---

## Walkthrough

```
nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
sum1 = 21, sum2 = 10 → swap so sum1=10, sum2=21, diff=11

gains from nums1 (increase): [6-1=5, 6-1=5, 6-2=4, 6-2=4, 6-2=4, 6-2=4]
gains from nums2 (decrease): [1-1=0, 2-1=1, 3-1=2, 4-1=3, 5-1=4, 6-1=5]

gains count: [0:0, 1:1, 2:1, 3:1, 4:5, 5:3]

g=5: use min(3, ceil(11/5)=3) = 3 → ops=3, diff=11-15=-4 ≤ 0 → BREAK

Result: 3 ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n + m) |
| **Space** | O(1) — fixed-size gains array |

---

## Key Takeaway

> **Greedy: maximize gain per operation. Count available gains by size, then consume largest first. The [1,6] range constraint makes gains bounded and countable.**
