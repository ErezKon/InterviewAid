# 664. Strange Printer

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/strange-printer](https://leetcode.com/problems/strange-printer)
**Companies:** Amazon, Bloomberg, Google, Inmobi, Intuit, Meta, Microsoft, Netease, Salesforce

---

## Approach: Interval DP — O(n³) ✅

```
FUNCTION strangePrinter(s):
    // Remove consecutive duplicates
    s = deduplicate(s)
    n = len(s)
    dp = n×n matrix

    FOR i ← 0 TO n - 1: dp[i][i] = 1

    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j = i + length - 1
            dp[i][j] = dp[i+1][j] + 1    // print s[i] alone

            FOR k ← i + 1 TO j:
                IF s[k] == s[i]:
                    dp[i][j] = MIN(dp[i][j], dp[i+1][k] + dp[k+1][j])
                    // s[i] and s[k] can be printed in one turn

    RETURN dp[0][n-1]
```
