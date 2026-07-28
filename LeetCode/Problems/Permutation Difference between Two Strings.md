# 3146. Permutation Difference between Two Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/permutation-difference-between-two-strings](https://leetcode.com/problems/permutation-difference-between-two-strings)
**Companies:** Accenture

---

## Problem Description
Given two strings `s` and `t` of equal length that are permutations of each other, find the maximum absolute difference of the positions of any character between the two strings. Formally, for each character `c`, compute `|index_s(c) - index_t(c)|` and return the maximum value.

## Examples
| s | t | Output |
|---|---|--------|
| "abc" | "cba" | 2 |
| "abcd" | "abdc" | 1 |
| "a" | "a" | 0 |

## Approach
Map each character to its index in the first string, then iterate the second string to compute absolute differences and track the maximum.

```text
FUNCTION MaxPermutationDifference(s, t):
    // build index map for s
    SET indexMap ← EMPTY MAP
    FOR i ← 0 TO LENGTH(s) - 1:
        SET ch ← s[i]
        SET indexMap[ch] ← i
    // compute max difference
    SET maxDiff ← 0
    FOR j ← 0 TO LENGTH(t) - 1:
        SET ch ← t[j]
        SET diff ← ABS(j - indexMap[ch])
        IF diff > maxDiff:
            SET maxDiff ← diff
    RETURN maxDiff
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1 | Build `indexMap` from `s = "abc"` | `{a:0, b:1, c:2}` |
| 2 | Compare each char in `t = "cba"` | diffs: `|0-2|=2`, `|1-1|=0`, `|2-0|=2` |
| 3 | Track maximum diff | `maxDiff = 2` |
| 4 | Return `2` |

## Complexity Analysis
Time complexity **O(n)** where *n* is string length, due to two linear passes. Space complexity **O(σ)** for the map, where *σ* ≤ 26 for lowercase letters.

## Follow-Up Questions
1. How would the solution change if strings could contain Unicode characters?
2. Can you compute the sum of all absolute differences instead of the maximum?
3. How to handle the case where strings are not permutations of each other?

## Key Takeaway
Mapping character positions in one string enables constant‑time look‑ups to compute positional differences efficiently.
