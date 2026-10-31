# 2663. Lexicographically Smallest Beautiful String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-beautiful-string](https://leetcode.com/problems/lexicographically-smallest-beautiful-string)
**Companies:** Amazon, Google

---

## Problem Description

A string is **beautiful** if:

- It consists of the first `k` letters of the English lowercase alphabet.
- It does not contain any substring of length `2` or more which is a palindrome.

You are given a beautiful string `s` of length `n` and a positive integer `k`.

Return *the lexicographically smallest string of length* `n`*, which is larger than* `s` *and is **beautiful***. If there is no such string, return an empty string.

A string `a` is lexicographically larger than a string `b` (of the same length) if in the first position where `a` and `b` differ, `a` has a character strictly larger than the corresponding character in `b`.

- For example, `"abcd"` is lexicographically larger than `"abcc"` because the first position they differ is at the fourth character, and `d` is greater than `c`.

**Constraints:**
- `1 <= n == s.length <= 10^5`
- `4 <= k <= 26`
- `s` is a beautiful string.

## Examples

```
Example 1:
  Input: s = "abcz", k = 26
  Output: "abda"
  Explanation: The string "abda" is beautiful and lexicographically larger than the string "abcz".
  It can be proven that there is no string that is lexicographically larger than the string "abcz", beautiful, and lexicographically smaller than the string "abda".
```

```
Example 2:
  Input: s = "dc", k = 4
  Output: ""
  Explanation: It can be proven that there is no string that is lexicographically larger than the string "dc" and is beautiful.
```

## Approach

Next Permutation Style — O(n) ✅

```text
FUNCTION smallestBeautifulString(s, k):
    // Find rightmost position to increment
    i ← len(s) - 1
    WHILE i ≥ 0:
        SET s[i] ← s[i] + 1
        // Carry if out of range
        IF s[i] ≥ 'a' + k:
            SET i ← i - 1
            CONTINUE
        // Ensure no palindrome with previous 1-2 chars
        IF i > 0 AND s[i] = s[i-1] OR i > 1 AND s[i] = s[i-2]:
            CONTINUE  // try next larger char
        BREAK
    IF i < 0: RETURN ""
    // Fill suffix with smallest valid chars
    FOR j FROM i+1 TO len(s)-1:
        SET c ← 'a'
        WHILE (j > 0 AND c = s[j-1]) OR (j > 1 AND c = s[j-2]):
            SET c ← c + 1
        SET s[j] ← c
    RETURN s
```

## Walkthrough

For `s = "abac"`, `k = 3`:

| Step | i | s (partial) | Action |
|------|---|-------------|--------|
| 1 | 3 | "abac" | Increment `c` → `d` (out of range, carry) |
| 2 | 2 | "aba?" | Increment `a` → `b` (creates "bb" palindrome) → try `c` (valid) |
| 3 | Fill suffix | "abc?" → smallest valid char `a` (no palindrome) |
| Result | – | "abca" |

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

1. How would the solution change if longer palindromic substrings were prohibited?
2. Can the algorithm be adapted to generate the *k-th* beautiful string?
3. What is the impact of increasing `k` beyond 26 (Unicode characters)?

## Key Takeaway

> Like "next permutation" but with palindrome constraints. Increment from the right, carry if out of range, and greedily fill the suffix with the smallest valid characters (avoiding palindromes with previous 1-2 chars).
