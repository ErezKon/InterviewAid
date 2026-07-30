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
Explanation: The string is already a palindrome.
```

**Example 2:**
```
Input: s = "mbadm"
Output: 2
Explanation: Insert "a" at position 1 and "b" at position 5 to make "madam".
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
- Can the problem be solved in O(n) time using a two‑pointer approach for special cases?
- What changes if deletions are allowed instead of insertions?

## Key Takeaway

> Making a string palindrome with minimum insertions = finding the **longest palindromic subsequence** via LCS with the reverse string, then inserting `n - LPS` characters.
