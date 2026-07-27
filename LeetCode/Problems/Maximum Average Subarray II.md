# 644. Maximum Average Subarray II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-average-subarray-ii](https://leetcode.com/problems/maximum-average-subarray-ii)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search on Answer — O(n log(V/ε))](#approach-binary-search-on-answer--on-logvε-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `k`, find a contiguous subarray of length **≥ k** with the **maximum average value**.

**Constraints:**
- `1 ≤ k ≤ n ≤ 10⁴`

---

## Key Insight

> Binary search on the answer (average value `mid`). Subtract `mid` from every element. If the maximum subarray sum of length ≥ k in the adjusted array is ≥ 0, then `mid` is achievable. Use prefix sums with a sliding minimum.

---

## Approach: Binary Search on Answer — O(n log(V/ε)) ✅

```
FUNCTION findMaxAverage(nums, k):
    lo, hi = MIN(nums), MAX(nums)

    WHILE hi - lo > 1e-5:
        mid = (lo + hi) / 2
        // Subtract mid from all elements
        adjusted = [num - mid FOR num IN nums]
        // Check: max subarray sum of length >= k
        IF maxSubarraySumLenK(adjusted, k) >= 0:
            lo = mid
        ELSE:
            hi = mid
    RETURN lo

FUNCTION maxSubarraySumLenK(arr, k):
    prefix = [0]; FOR a IN arr: prefix.APPEND(prefix[-1] + a)
    minPrefix = 0; result = -infinity
    FOR i ← k TO n:
        result = MAX(result, prefix[i] - minPrefix)
        minPrefix = MIN(minPrefix, prefix[i - k + 1])
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + Prefix Sum | **O(n log(V/ε))** | O(n) |

---

## Key Takeaway

> **"Max average subarray of length ≥ k" uses binary search on the answer + subarray sum check.** Subtract the candidate average and check if a non-negative sum subarray of length ≥ k exists.
