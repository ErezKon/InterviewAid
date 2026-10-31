# 1918. Kth Smallest Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/kth-smallest-subarray-sum](https://leetcode.com/problems/kth-smallest-subarray-sum)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an integer array `nums` of length `n` and an integer `k`, return *the *`k^th` ***smallest subarray sum**.*

A **subarray** is defined as a **non-empty** contiguous sequence of elements in an array. A **subarray sum** is the sum of all elements in the subarray.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 2 * 10^4`
- `1 <= nums[i] <= 5 * 10^4`
- `1 <= k <= n * (n + 1) / 2`

---

## Examples

**Example 1:**
```
Input: nums = [2,1,3], k = 4
Output: 3
Explanation: The subarrays of [2,1,3] are:
- [2] with sum 2
- [1] with sum 1
- [3] with sum 3
- [2,1] with sum 3
- [1,3] with sum 4
- [2,1,3] with sum 6
Ordering the sums from smallest to largest gives 1, 2, 3, 3, 4, 6. The 4th smallest is 3.
```

**Example 2:**
```
Input: nums = [3,3,5,5], k = 7
Output: 10
Explanation: The subarrays of [3,3,5,5] are:
- [3] with sum 3
- [3] with sum 3
- [5] with sum 5
- [5] with sum 5
- [3,3] with sum 6
- [3,5] with sum 8
- [5,5] with sum 10
- [3,3,5], with sum 11
- [3,5,5] with sum 13
- [3,3,5,5] with sum 16
Ordering the sums from smallest to largest gives 3, 3, 5, 5, 6, 8, 10, 11, 13, 16. The 7th smallest is 10.
```

---

## Approach

Binary Search + Sliding Window — O(n log S) ✅

Binary search on the sum value. For a candidate `mid`, count how many subarrays have sum ≤ mid using a sliding window.

```text
FUNCTION kthSmallestSubarraySum(nums, k):
    lo ← MIN(nums)
    hi ← SUM(nums)
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        IF countSubarrays(nums, mid) >= k:
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo

FUNCTION countSubarrays(nums, target):
    count ← 0; sum ← 0; left ← 0
    FOR right ← 0 TO LENGTH(nums)-1:
        sum ← sum + nums[right]
        WHILE sum > target:
            sum ← sum - nums[left]
            left ← left + 1
        count ← count + (right - left + 1)
    RETURN count
```

---

## Walkthrough

Consider `nums = [5,2,6]`, `k = 5`.

1. `lo = 2`, `hi = 13`.
2. `mid = 7`. Count subarrays ≤ 7 → `[5],[2],[5,2]` → 3 < k, so `lo = 8`.
3. `mid = 10`. Count ≤ 10 → `[5],[2],[6],[5,2],[2,6]` → 5 ≥ k, so `hi = 10`.
4. `mid = 9`. Count ≤ 9 → same 5, so `hi = 9`.
5. `mid = 8`. Count ≤ 8 → 4 < k, so `lo = 9`.
6. Loop ends, answer `9`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n · log S) where S is total sum of array | O(1) |

---

## Follow-Up Questions

1. How would the solution change if the array could contain negative numbers?
2. Can you extend the approach to return the actual k-th smallest subarray instead of its sum?
3. What if we need the k-th largest sum?

---

## Key Takeaway

> Binary search on sum + sliding window count. Since elements are positive, subarray sums are monotonic under window expansion — perfect for the sliding window counting technique.
