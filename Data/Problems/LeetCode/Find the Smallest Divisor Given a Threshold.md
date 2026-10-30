# 1283. Find the Smallest Divisor Given a Threshold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold](https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold)
**Companies:** Agoda, Amazon, Bloomberg, Clevertap, De Shaw, Expedia, Google, Ibm, Meta, Microsoft, Oracle, Paypal, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search on Answer — O(n log max) ✅](#4-approach-binary-search-on-answer--on-log-max-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array of integers `nums` and an integer `threshold`, we will choose a positive integer `divisor`, divide all the array by it, and sum the division's result. Find the **smallest** `divisor` such that the result mentioned above is less than or equal to `threshold`.

Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: `7/3 = 3` and `10/2 = 5`).

The test cases are generated so that there will be an answer.

**Constraints:**
- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^6`
- `nums.length <= threshold <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1.
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).
```

**Example 2:**
```
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44
```

---

## 3. Key Insight

> As the divisor increases, the sum decreases monotonically. Binary search on the divisor value.

---

## 4. Approach: Binary Search on Answer — O(n log max) ✅

```
FUNCTION smallestDivisor(nums, threshold):
    lo, hi = 1, MAX(nums)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF SUM(ceil(num / mid) for num in nums) <= threshold:
            hi = mid
        ELSE:
            lo = mid + 1

    RETURN lo
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log M) where M = max(nums) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Same **binary search on answer** pattern as "Koko Eating Bananas." The monotonic relationship between divisor and sum enables efficient binary search.
