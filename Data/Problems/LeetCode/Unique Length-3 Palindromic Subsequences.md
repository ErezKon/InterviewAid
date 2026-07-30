# 1930. Unique Length-3 Palindromic Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-length-3-palindromic-subsequences](https://leetcode.com/problems/unique-length-3-palindromic-subsequences)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a string `s` consisting of lowercase English letters, count the number of distinct palindromic subsequences of length three. A subsequence is formed by deleting zero or more characters without changing the order of the remaining characters.

## Examples
**Example 1:**
Input: `"aabca"
Output: 3
Explanation: The valid subsequences are `"aba"`, `"aca"`, and `"aaa"`.

**Example 2:**
Input: `"abc"
Output: 0
Explanation: No length‑3 palindrome can be formed.

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
