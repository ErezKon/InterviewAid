# 730. Count Different Palindromic Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-different-palindromic-subsequences](https://leetcode.com/problems/count-different-palindromic-subsequences)
**Companies:** Amazon, Google, Linkedin, Uber, Walmart Labs

---

## Approach: Interval DP — O(n²) ✅

```
FUNCTION countPalindromicSubsequences(s):
    MOD = 10^9 + 7
    n = len(s)
    dp = n × n zeros    // dp[i][j] = count in s[i..j]

    FOR i: dp[i][i] = 1

    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j = i + length - 1
            IF s[i] != s[j]:
                dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1]
            ELSE:
                // Find inner occurrences of s[i]
                lo = i + 1; hi = j - 1
                WHILE lo <= hi AND s[lo] != s[i]: lo += 1
                WHILE hi >= lo AND s[hi] != s[i]: hi -= 1

                IF lo > hi: dp[i][j] = 2 * dp[i+1][j-1] + 3
                ELSE IF lo == hi: dp[i][j] = 2 * dp[i+1][j-1] + 1
                ELSE: dp[i][j] = 2 * dp[i+1][j-1] - dp[lo+1][hi-1]

            dp[i][j] = ((dp[i][j] % MOD) + MOD) % MOD

    RETURN dp[0][n-1]
```
