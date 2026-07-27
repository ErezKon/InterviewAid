# 1918. Kth Smallest Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/kth-smallest-subarray-sum](https://leetcode.com/problems/kth-smallest-subarray-sum)
**Companies:** Google

---

## 1. Problem Description

Given an array of positive integers, return the k-th smallest subarray sum.

---

## 2. Approach: Binary Search + Sliding Window — O(n log S) ✅

Binary search on the sum value. For a candidate `mid`, count how many subarrays have sum ≤ mid using a sliding window.

```
FUNCTION kthSmallestSubarraySum(nums, k):
    lo, hi = MIN(nums), SUM(nums)
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF countSubarrays(nums, mid) >= k: hi = mid
        ELSE: lo = mid + 1
    RETURN lo

FUNCTION countSubarrays(nums, target):
    count = 0; sum = 0; left = 0
    FOR right ← 0 TO n-1:
        sum += nums[right]
        WHILE sum > target: sum -= nums[left]; left += 1
        count += right - left + 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n · log(S)) where S = total sum | O(1) |

---

## 3. Key Takeaway

> Binary search on sum + sliding window count. Since elements are positive, subarray sums are monotonic under window expansion — perfect for the sliding window counting technique.
