# 644. Maximum Average Subarray II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-average-subarray-ii](https://leetcode.com/problems/maximum-average-subarray-ii)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search on Answer — O(n log(V/ε))](#approach-binary-search-on-answer--on-logvε-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums` consisting of `n` elements, and an integer `k`.

Find a contiguous subarray whose **length is greater than or equal to** `k` that has the maximum average value and return *this value*. Any answer with a calculation error less than `10^-5` will be accepted.

**Constraints:**
- `n == nums.length`
- `1 <= k <= n <= 10^4`
- `-10^4 <= nums[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: - When the length is 4, averages are [0.5, 12.75, 10.5] and the maximum average is 12.75
- When the length is 5, averages are [10.4, 10.8] and the maximum average is 10.8
- When the length is 6, averages are [9.16667] and the maximum average is 9.16667
The maximum average is when we choose a subarray of length 4 (i.e., the sub array [12, -5, -6, 50]) which has the max average 12.75, so we return 12.75
Note that we do not consider the subarrays of length < 4.
```

**Example 2:**
```
Input: nums = [5], k = 1
Output: 5.00000
```

---

## Key Insight

> Binary search on the answer (average value `mid`). Subtract `mid` from every element. If the maximum subarray sum of length ≥ k in the adjusted array is ≥ 0, then `mid` is achievable. Use prefix sums with a sliding minimum.

---

## Approach: Binary Search on Answer — O(n log(V/ε)) ✅

```text
FUNCTION findMaxAverage(nums, k):
    SET lo ← MIN(nums)
    SET hi ← MAX(nums)
    WHILE hi - lo > 1e-5:
        SET mid ← (lo + hi) / 2
        // Adjust array by subtracting mid
        SET adjusted ← []
        FOR each num IN nums:
            APPEND (num - mid) TO adjusted
        // Check if a subarray of length ≥ k has non‑negative sum
        IF maxSubarraySumLenK(adjusted, k) >= 0:
            SET lo ← mid
        ELSE:
            SET hi ← mid
    RETURN lo

FUNCTION maxSubarraySumLenK(arr, k):
    SET n ← LENGTH(arr)
    SET prefix ← ARRAY of n+1 zeros
    FOR i ← 1 TO n:
        SET prefix[i] ← prefix[i-1] + arr[i-1]
    SET minPrefix ← 0
    SET result ← -infinity
    FOR i ← k TO n:
        SET result ← MAX(result, prefix[i] - minPrefix)
        SET minPrefix ← MIN(minPrefix, prefix[i - k + 1])
    RETURN result
```

---

## Walkthrough

Consider `nums = [1,12,-5,-6,50,3]`, `k = 4`.
1. **Binary search range:** lo = 1, hi = 50.
2. **Mid = 25.5:** Adjusted = [-24.5, -13.5, -30.5, -31.5, 24.5, -22.5]. The best subarray of length ≥4 has sum < 0 → hi = 25.5.
3. **Mid = 13.25:** Adjusted = [-12.25, -1.25, -18.25, -19.25, 36.75, -10.25]. The subarray `[ -1.25, -18.25, -19.25, 36.75 ]` (indices 1‑4) sums to -2 → still <0 → hi = 13.25.
4. **Mid = 7.875:** Adjusted = [-6.875, 4.125, -12.875, -13.875, 42.125, -4.875]. Subarray `[4.125, -12.875, -13.875, 42.125]` sums to 19.5 ≥ 0 → lo = 7.875.
5. Continue narrowing until `hi - lo` ≤ 1e-5. Final `lo` ≈ 12.75.

The algorithm converges to the maximum average 12.75.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + Prefix Sum | **O(n log(V/ε))** | O(n) |

---

## Follow-Up Questions

- How would you adapt the solution if the subarray length must be exactly `k`?
- Can the problem be solved in O(n) without binary search using a convex hull trick?
- What changes if the array contains only positive numbers? Would a sliding window suffice?

---

## Key Takeaway

> **"Max average subarray of length ≥ k" uses binary search on the answer + subarray sum check.** Subtract the candidate average and check if a non‑negative sum subarray of length ≥ k exists.
