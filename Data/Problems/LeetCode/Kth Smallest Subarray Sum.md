# 1918. Kth Smallest Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/kth-smallest-subarray-sum](https://leetcode.com/problems/kth-smallest-subarray-sum)
**Companies:** Google

---

## Problem Description

Given an array of positive integers, return the k‑th smallest subarray sum.

---

## Examples

| nums | k | Output |
|------|---|--------|
| [5,2,6] | 5 | 9 |
| [2,3,4,5] | 10 | 14 |

*Explanation*: All subarray sums are `[5,7,13,2,8,14,6,12,5,9]` sorted → the 5th smallest is `9`.

---

## Approach

Binary Search + Sliding Window — O(n log S) ✅

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
2. `mid = 7`. Count subarrays ≤ 7 → `[5],[2],[5,2]` → 3 < k, so `lo = 8`.
3. `mid = 10`. Count ≤ 10 → `[5],[2],[6],[5,2],[2,6]` → 5 ≥ k, so `hi = 10`.
4. `mid = 9`. Count ≤ 9 → same 5, so `hi = 9`.
5. `mid = 8`. Count ≤ 8 → 4 < k, so `lo = 9`.
6. Loop ends, answer `9`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n · log S) where S is total sum of array | O(1) |

---

## Follow-Up Questions

1. How would the solution change if the array could contain negative numbers?
2. Can you extend the approach to return the actual k‑th smallest subarray instead of its sum?
3. What if we need the k‑th largest sum?

---

## Key Takeaway

> Binary search on sum + sliding window count. Since elements are positive, subarray sums are monotonic under window expansion — perfect for the sliding window counting technique.
