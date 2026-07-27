# 1771. Maximize Palindrome Length From Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-palindrome-length-from-subsequences](https://leetcode.com/problems/maximize-palindrome-length-from-subsequences)
**Companies:** Goldman Sachs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: LPS on Concatenation — O((m+n)²)](#approach-lps-on-concatenation--omn²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two strings `word1` and `word2`, find the **longest palindromic subsequence** formed by concatenating a non-empty subsequence of `word1` with a non-empty subsequence of `word2`.

**Constraints:**
- `1 ≤ word1.length, word2.length ≤ 1000`

---

## Examples

**Example 1:**
```
Input:  word1 = "cacb", word2 = "cbba"
Output: 5
Explanation: "abcba" — "ab" from word1, "cba" from word2? 
             Actually: subsequence from word1 + subsequence from word2 forming a palindrome.
```

---

## Key Insight

> Concatenate `s = word1 + word2`. Run the standard **Longest Palindromic Subsequence** (LPS) DP on `s`. The constraint is that the palindrome must use at least one character from each word. Track this by only updating the answer when `dp[i][j]` spans across the boundary (i < len(word1) ≤ j) and `s[i] == s[j]`.

---

## Approach: LPS on Concatenation — O((m+n)²) ✅

```
FUNCTION longestPalindrome(word1, word2):
    s = word1 + word2
    n = len(s); m = len(word1)
    dp = n × n matrix of zeros
    result = 0

    FOR i ← 0 TO n - 1: dp[i][i] = 1

    FOR length ← 2 TO n:
        FOR i ← 0 TO n - length:
            j = i + length - 1
            IF s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
                // Check if palindrome spans the boundary
                IF i < m AND j >= m:
                    result = MAX(result, dp[i][j])
            ELSE:
                dp[i][j] = MAX(dp[i+1][j], dp[i][j-1])

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| LPS DP on concatenation | **O((m+n)²)** | O((m+n)²) |

---

## Key Takeaway

> **Concatenate the two strings and run LPS DP, but only count palindromes that span the boundary.** The boundary check `i < m ≤ j` ensures both words contribute at least one character.
