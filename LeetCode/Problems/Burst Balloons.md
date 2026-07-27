# 312. Burst Balloons

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/burst-balloons](https://leetcode.com/problems/burst-balloons)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Paytm, Phonepe, Salesforce, Samsung, Snapchat, Tcs, Uber, Uipath

---

## Approach: Interval DP — O(n³) ✅

Key insight: think of which balloon to burst **last** in each interval.

```
FUNCTION maxCoins(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = n × n matrix of zeros

    FOR length ← 2 TO n - 1:
        FOR left ← 0 TO n - length - 1:
            right = left + length
            FOR k ← left + 1 TO right - 1:
                // k is the LAST balloon burst in (left, right)
                coins = nums[left] * nums[k] * nums[right]
                dp[left][right] = MAX(dp[left][right],
                    dp[left][k] + coins + dp[k][right])

    RETURN dp[0][n-1]
```

`dp[left][right]` = max coins from bursting all balloons between left and right (exclusive).
