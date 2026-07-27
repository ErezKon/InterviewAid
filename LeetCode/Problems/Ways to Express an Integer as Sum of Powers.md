# 2787. Ways to Express an Integer as Sum of Powers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers](https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION numberOfWays(n, x):
    MOD = 10^9 + 7
    dp = [0] * (n + 1)
    dp[0] = 1

    base = 1
    WHILE base^x <= n:
        power = base^x
        FOR j ← n DOWN TO power:
            dp[j] = (dp[j] + dp[j - power]) % MOD
        base += 1

    RETURN dp[n]
```

0-1 knapsack on powers.
