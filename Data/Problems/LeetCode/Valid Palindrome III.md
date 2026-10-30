# 1216. Valid Palindrome III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/valid-palindrome-iii](https://leetcode.com/problems/valid-palindrome-iii)
**Companies:** Amazon, Meta, Tiktok

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

Given a string `s` and an integer `k`, return `true` if `s` is a `k`**-palindrome**.

A string is `k`**-palindrome** if it can be transformed into a palindrome by removing at most `k` characters from it.

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of only lowercase English letters.
- `1 <= k <= s.length`

## Examples

**Example 1:**
```
Input: s = "abcdeca", k = 2
Output: true
Explanation: Remove 'b' and 'e' characters.
```

**Example 2:**
```
Input: s = "abbababa", k = 1
Output: true
```

## Approach
The minimum number of deletions needed equals `len(s) - LPS`, where `LPS` is the length of the longest palindromic subsequence. Compute `LPS` via **Longest Common Subsequence (LCS)** between `s` and its reverse.

### Pseudocode
```text
FUNCTION isValidPalindrome(s, k):
    n ← LENGTH(s)
    rev ← REVERSE(s)
    // DP table for LCS
    dp ← MATRIX (n+1) × (n+1) FILLED WITH 0
    FOR i ← 1 TO n:
        FOR j ← 1 TO n:
            IF s[i-1] == rev[j-1]:
                dp[i][j] ← dp[i-1][j-1] + 1
            ELSE:
                dp[i][j] ← MAX(dp[i-1][j], dp[i][j-1])
    lps ← dp[n][n]
    RETURN (n - lps) <= k
```

## Walkthrough
Consider `s = "abcdeca"`:
- Reverse is `"acedcba"`.
- DP computes `LPS = 5` ("acdca").
- Deletions needed = 7 - 5 = 2 ≤ k, so return true.

## Complexity Analysis
- **Time:** O(n²) due to the DP table.
- **Space:** O(n²) for the DP matrix (can be reduced to O(n) with rolling arrays).

## Follow-Up Questions
1. How to solve the problem in O(n) space?
2. Extend to allow at most `k` replacements instead of deletions.
3. Find the actual palindrome after deletions.

## Key Takeaway
The edit distance to a palindrome equals the difference between the string length and its longest palindromic subsequence, which can be found via LCS.
