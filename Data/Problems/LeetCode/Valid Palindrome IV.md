# 2330. Valid Palindrome IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-palindrome-iv](https://leetcode.com/problems/valid-palindrome-iv)
**Companies:** Amazon, Meta

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py). The original description (and the Approach/Walkthrough below) treat this as "remove at most k characters" (that is #1216). Correct idea: count mismatched pairs `s[i] != s[n−1−i]` with two pointers; return `true` iff the count is `≤ 2`. O(n).*

You are given a **0-indexed** string `s` consisting of only lowercase English letters. In one operation, you can change **any** character of `s` to any **other** character.

Return `true` *if you can make* `s` *a palindrome after performing **exactly** one or two operations, or return* `false` *otherwise.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "abcdba"
Output: true
Explanation: One way to make s a palindrome using 1 operation is:
- Change s[2] to 'd'. Now, s = "abddba".
One operation could be performed to make s a palindrome so return true.
```

**Example 2:**
```
Input: s = "aa"
Output: true
Explanation: One way to make s a palindrome using 2 operations is:
- Change s[0] to 'b'. Now, s = "ba".
- Change s[1] to 'b'. Now, s = "bb".
Two operations could be performed to make s a palindrome so return true.
```

**Example 3:**
```
Input: s = "abcdef"
Output: false
Explanation: It is not possible to make s a palindrome using one or two operations so return false.
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
