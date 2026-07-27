# 446. Arithmetic Slices II - Subsequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/arithmetic-slices-ii-subsequence](https://leetcode.com/problems/arithmetic-slices-ii-subsequence)
**Companies:** Amazon, Baidu, Bloomberg, Google

---

## Approach: DP with Hash Map — O(n²) ✅

```
FUNCTION numberOfArithmeticSlices(nums):
    n = len(nums)
    dp = [defaultdict(int) for _ in range(n)]
    total = 0

    FOR i ← 0 TO n - 1:
        FOR j ← 0 TO i - 1:
            diff = nums[i] - nums[j]
            count = dp[j][diff]
            total += count    // extend existing subsequences
            dp[i][diff] += count + 1

    RETURN total
```

dp[i][d] = number of arithmetic subsequences of length ≥ 2 ending at i with diff d.
