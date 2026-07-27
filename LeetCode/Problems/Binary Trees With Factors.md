# 823. Binary Trees With Factors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-trees-with-factors](https://leetcode.com/problems/binary-trees-with-factors)
**Companies:** Google

---

```
FUNCTION numFactoredBinaryTrees(arr):
    MOD = 10^9 + 7
    SORT arr
    dp = {x: 1 for x in arr}
    arrSet = set(arr)

    FOR i, num IN enumerate(arr):
        FOR j ← 0 TO i - 1:
            IF num % arr[j] == 0 AND num / arr[j] IN arrSet:
                dp[num] = (dp[num] + dp[arr[j]] * dp[num // arr[j]]) % MOD

    RETURN SUM(dp.values()) % MOD
```
