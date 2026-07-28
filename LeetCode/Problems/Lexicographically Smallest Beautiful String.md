# 2663. Lexicographically Smallest Beautiful String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-beautiful-string](https://leetcode.com/problems/lexicographically-smallest-beautiful-string)
**Companies:** Amazon, Google

---

## Problem Description

A "beautiful" string uses only the first `k` letters and contains no palindromic substring of length ≥ 2. Find the lexicographically smallest beautiful string greater than `s`, or return `""`.

## Examples

| s | k | Output |
|---|---|---|
| "abac" | 3 | "abca" |
| "zz" | 2 | "" |

*Explanation*: The first example increments the last character while maintaining the beautiful property. The second has no valid larger string.

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
        // Ensure no palindrome with previous 1‑2 chars
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
2. Can the algorithm be adapted to generate the *k‑th* beautiful string?
3. What is the impact of increasing `k` beyond 26 (Unicode characters)?

## Key Takeaway

> Like "next permutation" but with palindrome constraints. Increment from the right, carry if out of range, and greedily fill the suffix with the smallest valid characters (avoiding palindromes with previous 1‑2 chars).
