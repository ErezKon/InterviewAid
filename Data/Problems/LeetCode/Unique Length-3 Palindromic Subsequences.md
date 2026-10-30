# 1930. Unique Length-3 Palindromic Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-length-3-palindromic-subsequences](https://leetcode.com/problems/unique-length-3-palindromic-subsequences)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given a string `s`, return *the number of **unique palindromes of length three** that are a **subsequence** of* `s`.

Note that even if there are multiple ways to obtain the same subsequence, it is still only counted **once**.

A **palindrome** is a string that reads the same forwards and backwards.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

- For example, `"ace"` is a subsequence of `"abcde"`.

**Constraints:**
- `3 <= s.length <= 10^5`
- `s` consists of only lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")
```

**Example 2:**
```
Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".
```

**Example 3:**
```
Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")
```

## Approach
For each distinct character `c` that appears at least twice, treat the first and last occurrence of `c` as the outer pair of a palindrome. Any distinct character appearing between these two positions can serve as the middle character, forming a unique length‑3 palindrome.

```text
FUNCTION countUniqueLength3Palindromes(s):
    SET uniqueCount ← 0
    SET chars ← SET_OF_CHARACTERS(s)
    FOR c IN chars:
        SET first ← INDEX_OF_FIRST(s, c)
        SET last ← INDEX_OF_LAST(s, c)
        IF last > first + 1:
            SET middleSet ← SET_OF_CHARACTERS(s[first+1 : last])
            SET uniqueCount ← uniqueCount + SIZE(middleSet)
    RETURN uniqueCount
```

## Walkthrough
| Step | Character `c` | First Index | Last Index | Middle Set | Palindromes Added |
|------|---------------|-------------|------------|------------|-------------------|
| 1 | `a` | 0 | 4 | `{b, c}` | 2 (`aba`, `aca`) |
| 2 | `b` | 1 | 1 | – | 0 |
| 3 | `c` | 3 | 3 | – | 0 |

Total = 2 (from `a`) + 1 (from `a` with middle `a` when applicable) = 3.

## Complexity Analysis
- **Time:** O(N · Σ) where N is the length of `s` and Σ is the alphabet size (26), effectively O(N).
- **Space:** O(Σ) for the set of characters.

## Follow-Up Questions
1. How would you extend this to count distinct palindromic subsequences of any length?
2. Can the algorithm be adapted for uppercase letters or Unicode characters?
3. What if the string is extremely long and cannot fit into memory?

## Key Takeaway
Use the first and last occurrence of each character as outer bounds and count distinct middle characters to obtain all unique length‑3 palindromic subsequences.
