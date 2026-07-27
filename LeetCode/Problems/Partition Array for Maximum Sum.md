# 1043. Partition Array for Maximum Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-for-maximum-sum](https://leetcode.com/problems/partition-array-for-maximum-sum)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION maxSumAfterPartitioning(arr, k):
    n = len(arr)
    dp = [0] * (n + 1)

    FOR i ← 1 TO n:
        maxVal = 0
        FOR j ← 1 TO MIN(k, i):
            maxVal = MAX(maxVal, arr[i - j])
            dp[i] = MAX(dp[i], dp[i - j] + maxVal * j)

    RETURN dp[n]
```

For each position, try all partition lengths 1..k. Replace partition with max value × length.
