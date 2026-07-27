# 1312. Minimum Insertion Steps to Make a String Palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome)
**Companies:** Accenture, Amazon, Goldman Sachs, Google, Ibm, Oracle

---

## Problem Description

Return the **minimum number of insertions** to make string `s` a palindrome.

## Key Insight

> Min insertions = `n - LPS` where LPS = Longest Palindromic Subsequence. LPS = LCS(s, reverse(s)). The characters not in the LPS each need one insertion to mirror them.

## Approach: LCS with Reverse — O(n²) ✅

```
FUNCTION minInsertions(s):
    // Min insertions = n - LPS (Longest Palindromic Subsequence)
    // LPS = LCS(s, reverse(s))
    rev = REVERSE(s)
    n = len(s)

    dp = (n+1) × (n+1) zeros
    FOR i ← 1 TO n:
        FOR j ← 1 TO n:
            IF s[i-1] == rev[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            ELSE:
                dp[i][j] = MAX(dp[i-1][j], dp[i][j-1])

    RETURN n - dp[n][n]
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) — reducible to O(n) |

## Key Takeaway

> Making a string palindrome with minimum insertions = finding the **longest palindromic subsequence** via LCS with the reverse string, then inserting `n - LPS` characters.
