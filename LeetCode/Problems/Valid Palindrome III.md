# 1216. Valid Palindrome III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/valid-palindrome-iii](https://leetcode.com/problems/valid-palindrome-iii)
**Companies:** Amazon, Meta, Tiktok

---

```
FUNCTION isValidPalindrome(s, k):
    // Find longest palindromic subsequence
    n = len(s); rev = reversed(s)
    // LCS(s, reverse(s)) = LPS
    dp = (n+1) × (n+1) zeros
    FOR i ← 1 TO n:
        FOR j ← 1 TO n:
            IF s[i-1] == rev[j-1]: dp[i][j] = dp[i-1][j-1] + 1
            ELSE: dp[i][j] = MAX(dp[i-1][j], dp[i][j-1])
    RETURN n - dp[n][n] <= k
```
