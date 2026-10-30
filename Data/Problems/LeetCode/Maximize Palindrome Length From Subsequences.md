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

You are given two strings, `word1` and `word2`. You want to construct a string in the following manner:

- Choose some **non-empty** subsequence `subsequence1` from `word1`.
- Choose some **non-empty** subsequence `subsequence2` from `word2`.
- Concatenate the subsequences: `subsequence1 + subsequence2`, to make the string.

Return *the **length** of the longest **palindrome** that can be constructed in the described manner. *If no palindromes can be constructed, return `0`.

A **subsequence** of a string `s` is a string that can be made by deleting some (possibly none) characters from `s` without changing the order of the remaining characters.

A **palindrome** is a string that reads the same forward as well as backward.

**Constraints:**
- `1 <= word1.length, word2.length <= 1000`
- `word1` and `word2` consist of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: word1 = "cacb", word2 = "cbba"
Output: 5
Explanation: Choose "ab" from word1 and "cba" from word2 to make "abcba", which is a palindrome.
```

**Example 2:**
```
Input: word1 = "ab", word2 = "ab"
Output: 3
Explanation: Choose "ab" from word1 and "a" from word2 to make "aba", which is a palindrome.
```

**Example 3:**
```
Input: word1 = "aa", word2 = "bb"
Output: 0
Explanation: You cannot construct a palindrome from the described method, so return 0.
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
