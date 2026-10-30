# 3146. Permutation Difference between Two Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/permutation-difference-between-two-strings](https://leetcode.com/problems/permutation-difference-between-two-strings)
**Companies:** Accenture

---

## Problem Description
You are given two strings `s` and `t` such that every character occurs at most once in `s` and `t` is a permutation of `s`.

The **permutation difference** between `s` and `t` is defined as the **sum** of the absolute difference between the index of the occurrence of each character in `s` and the index of the occurrence of the same character in `t`.

Return the **permutation difference** between `s` and `t`.

**Constraints:**

- `1 <= s.length <= 26`
- Each character occurs at most once in `s`.
- `t` is a permutation of `s`.
- `s` consists only of lowercase English letters.

## Examples

```
Example 1:
  Input: s = "abc", t = "bac"
  Output: 2
  Explanation: For s = "abc" and t = "bac", the permutation difference of s and t is equal to the sum of:
    - The absolute difference between the index of the occurrence of "a" in s and the index of the occurrence of "a" in t.
    - The absolute difference between the index of the occurrence of "b" in s and the index of the occurrence of "b" in t.
    - The absolute difference between the index of the occurrence of "c" in s and the index of the occurrence of "c" in t.
  That is, the permutation difference between s and t is equal to |0 - 1| + |1 - 0| + |2 - 2| = 2.
```

```
Example 2:
  Input: s = "abcde", t = "edbac"
  Output: 12
  Explanation: The permutation difference between s and t is equal to |0 - 3| + |1 - 2| + |2 - 4| + |3 - 1| + |4 - 0| = 12.
```

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
