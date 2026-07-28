# 2330. Valid Palindrome IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-palindrome-iv](https://leetcode.com/problems/valid-palindrome-iv)
**Companies:** Amazon, Meta

---

## Problem Description
Given a string `s` and an integer `k`, determine whether it is possible to make `s` a palindrome by **removing at most `k` characters**. The remaining characters must retain their original order.

## Examples
**Example 1**
```
Input: s = "abca", k = 1
Output: true
Explanation: Remove 'b' to obtain "aca", which is a palindrome.
```
**Example 2**
```
Input: s = "abcdef", k = 2
Output: false
Explanation: At least three deletions are required to form a palindrome.
```

## Approach
The problem reduces to checking whether the **minimum deletions** needed to form a palindrome are ≤ `k`. This minimum equals `len(s) - LPS`, where `LPS` is the length of the longest palindromic subsequence. Compute `LPS` via **LCS** between `s` and its reverse.

### Pseudocode
```text
FUNCTION canMakePalindrome(s, k):
    n ← LENGTH(s)
    rev ← REVERSE(s)
    dp ← MATRIX (n+1) × (n+1) FILLED WITH 0
    FOR i ← 1 TO n:
        FOR j ← 1 TO n:
            IF s[i-1] == rev[j-1]:
                dp[i][j] ← dp[i-1][j-1] + 1
            ELSE:
                dp[i][j] ← MAX(dp[i-1][j], dp[i][j-1])
    lps ← dp[n][n]
    minDeletions ← n - lps
    RETURN minDeletions ≤ k
```

## Walkthrough
For `s = "abca"`:
- Reverse = `"acba"`.
- DP yields `LPS = 3` ("aba" or "aca").
- Minimum deletions = 4 - 3 = 1 ≤ k, so return true.

## Complexity Analysis
- **Time:** O(n²) for the DP computation.
- **Space:** O(n²) (can be optimized to O(n) with rolling arrays).

## Follow-Up Questions
1. How can you reduce the space complexity to O(n)?
2. Extend to allow at most `k` **replacements** instead of deletions.
3. Find the actual palindrome after performing the deletions.

## Key Takeaway
The edit distance to a palindrome equals the string length minus its longest palindromic subsequence, which can be efficiently computed via LCS.
