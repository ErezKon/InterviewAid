# 2134. Minimum Swaps to Group All 1's Together II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii)
**Companies:** Adobe, Amazon, Arcesium, Bloomberg, Bytedance, Google, Ibm, Josh Technology, Microsoft, Tiktok

---

## Approach: Fixed-Size Sliding Window (Circular) — O(n) ✅

```
FUNCTION minSwaps(nums):
    ones = SUM(nums)
    IF ones <= 1: RETURN 0

    n = len(nums)
    // Count zeros in first window of size 'ones'
    zeros = SUM(1 for i in range(ones) if nums[i] == 0)
    minZeros = zeros

    FOR i ← 1 TO n - 1:
        // Slide window circularly
        IF nums[(i - 1)] == 0: zeros -= 1     // remove left
        IF nums[(i + ones - 1) % n] == 0: zeros += 1  // add right
        minZeros = MIN(minZeros, zeros)

    RETURN minZeros
```

Window size = count of 1s. Minimum zeros in any window = minimum swaps needed.
