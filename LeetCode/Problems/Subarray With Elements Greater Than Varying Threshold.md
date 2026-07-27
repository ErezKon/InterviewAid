# 2334. Subarray With Elements Greater Than Varying Threshold

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold](https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold)
**Companies:** Amazon, Google, Instabase, Tiktok

---

## Approach: Monotonic Stack — O(n) ✅

```
FUNCTION validSubarraySize(nums, threshold):
    n = len(nums)
    left = [-1] * n; right = [n] * n
    stack = []
    FOR i ← 0 TO n - 1:
        WHILE stack AND nums[stack[-1]] >= nums[i]:
            right[stack.POP()] = i
        IF stack: left[i] = stack[-1]
        stack.PUSH(i)

    FOR i ← 0 TO n - 1:
        k = right[i] - left[i] - 1
        IF nums[i] > threshold / k: RETURN k

    RETURN -1
```

For each element as the minimum, find max subarray width. Check threshold/k condition.
