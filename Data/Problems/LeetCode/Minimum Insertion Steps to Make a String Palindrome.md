# 1312. Minimum Insertion Steps to Make a String Palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome)
**Companies:** Accenture, Amazon, Goldman Sachs, Google, Ibm, Oracle

---

## Problem Description

Given a string `s`. In one step you can insert any character at any index of the string.

Return *the minimum number of steps* to make `s` palindrome.

A **Palindrome String** is one that reads the same backward as well as forward.

**Constraints:**
- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.

## Key Insight

> Min insertions = `n - LPS` where LPS = Longest Palindromic Subsequence. LPS = LCS(s, reverse(s)). The characters not in the LPS each need one insertion to mirror them.

## Approach: LCS with Reverse — O(n²) ✅

```text
FUNCTION minInsertions(s):
    // Compute longest palindromic subsequence via LCS with reverse
    SET rev ← REVERSE(s)
    SET n ← LENGTH(s)
    CREATE dp[0..n][0..n] INITIALIZED TO 0
    FOR i ← 1 TO n:
        FOR j ← 1 TO n:
            IF s[i-1] == rev[j-1]:
                SET dp[i][j] ← dp[i-1][j-1] + 1
            ELSE:
                SET dp[i][j] ← MAX(dp[i-1][j], dp[i][j-1])
            END IF
        END FOR
    END FOR
    RETURN n - dp[n][n]
```

## Examples

**Example 1:**
```
Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.
```

**Example 2:**
```
Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
```

**Example 3:**
```
Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
```

## Walkthrough

Take `s = "mbadm"`.
1. Reverse string: `rev = "mdabm"`.
2. Build LCS table; the longest common subsequence between `s` and `rev` is "mad" of length 3.
3. Length of `s` is 5, so minimum insertions = 5 - 3 = 2.
4. One possible palindrome after insertions is "madam".

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) – filling the DP table | O(n²) – DP matrix (can be reduced to O(n) with rolling arrays) |

## Follow-Up Questions

- How would you modify the solution to also output the resulting palindrome?
- Can the problem be solved in O(n) time using a two-pointer approach for special cases?
- What changes if deletions are allowed instead of insertions?

## Key Takeaway

> Making a string palindrome with minimum insertions = finding the **longest palindromic subsequence** via LCS with the reverse string, then inserting `n - LPS` characters.
