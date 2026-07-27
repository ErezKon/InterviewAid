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

Given array `nums` and integer `threshold`, find the smallest divisor such that the sum of `⌈nums[i] / divisor⌉` for all elements is ≤ threshold.

**Constraints:**
- `1 <= nums.length <= 5 × 10⁴`
- `1 <= nums[i], threshold <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,2,5,9], threshold = 6
  Output: 5
  Reason: ceil(1/5)+ceil(2/5)+ceil(5/5)+ceil(9/5) = 1+1+1+2 = 5 ≤ 6.
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
