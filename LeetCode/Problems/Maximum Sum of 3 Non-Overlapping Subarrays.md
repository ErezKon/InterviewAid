# 689. Maximum Sum of 3 Non-Overlapping Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays](https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays)
**Companies:** Amazon, Bloomberg, General Motors, Google, Meta, Microsoft

---

## Approach: DP with Left/Right Best — O(n) ✅

```
FUNCTION maxSumOfThreeSubarrays(nums, k):
    n = len(nums)
    windowSums = [SUM(nums[i:i+k]) for i in range(n-k+1)]

    // Best single window on the left
    left = [0] * len(windowSums)
    best = 0
    FOR i ← 0 TO len(windowSums) - 1:
        IF windowSums[i] > windowSums[best]: best = i
        left[i] = best

    // Best single window on the right
    right = [0] * len(windowSums)
    best = len(windowSums) - 1
    FOR i ← len(windowSums) - 1 DOWN TO 0:
        IF windowSums[i] >= windowSums[best]: best = i
        right[i] = best

    // Try each middle window
    maxSum = 0; result = [0, 0, 0]
    FOR mid ← k TO len(windowSums) - k - 1:
        l = left[mid - k]; r = right[mid + k]
        total = windowSums[l] + windowSums[mid] + windowSums[r]
        IF total > maxSum:
            maxSum = total
            result = [l, mid, r]

    RETURN result
```
