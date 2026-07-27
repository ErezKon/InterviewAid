# 516. Longest Palindromic Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindromic-subsequence](https://leetcode.com/problems/longest-palindromic-subsequence)
**Companies:** Accenture, Amazon, Bloomberg, Goldman Sachs, Google, Infosys, Linkedin, Maq Software, Meta, Microsoft, Nutanix, Tcs, Uber, Zoho

---

## Approach: DP — O(n²) ✅

```
FUNCTION longestPalindromeSubseq(s):
    n = len(s)
    dp = n×n matrix of zeros
    FOR i ← n-1 DOWN TO 0:
        dp[i][i] = 1
        FOR j ← i+1 TO n-1:
            IF s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
            ELSE:
                dp[i][j] = MAX(dp[i+1][j], dp[i][j-1])
    RETURN dp[0][n-1]
```

| Time | Space |
|------|-------|
| O(n²) | O(n²), optimizable to O(n) |

Or equivalently: LPS(s) = LCS(s, reverse(s)).

---

## Key Takeaway

> Interval DP on `s[i..j]`. If endpoints match, extend by 2; otherwise take the better of skipping either end. Can reduce to LCS(s, reverse(s)).
