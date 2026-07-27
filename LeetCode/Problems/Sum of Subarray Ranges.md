# 2104. Sum of Subarray Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-subarray-ranges](https://leetcode.com/problems/sum-of-subarray-ranges)
**Companies:** Amazon, Apple, Bloomberg, Chubb, De Shaw, Google, Meta, Microsoft, Phonepe, Tiktok

---

## Approach: Monotonic Stack — O(n) ✅

Range = max - min for each subarray. Sum of all ranges = Sum of all subarray maximums - Sum of all subarray minimums.

```
FUNCTION subArrayRanges(nums):
    RETURN sumSubarrayMaxs(nums) - sumSubarrayMins(nums)
```

Use the same monotonic stack technique as Sum of Subarray Minimums (#907) for both max and min sums.

Brute force O(n²) also works for small n:
```
FOR i ← 0 TO n - 1:
    curMin = curMax = nums[i]
    FOR j ← i + 1 TO n - 1:
        curMin = MIN(curMin, nums[j])
        curMax = MAX(curMax, nums[j])
        result += curMax - curMin
```
