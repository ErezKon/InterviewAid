# 2186. Minimum Number of Steps to Make Two Strings Anagram II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram-ii](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram-ii)
**Companies:** Wealthfront

---

## Problem Description
Given two strings `s` and `t` consisting of lowercase English letters, you can perform the following operation any number of times: choose a character in either string and delete it, or insert any character at any position. Return the minimum number of such operations required to make the two strings anagrams of each other.

## Examples
| s | t | Output | Explanation |
|---|---|---|---|
| "bab" | "aba" | 0 | Both strings already contain the same multiset of characters. |
| "leetcode" | "coats" | 7 | Delete characters `l, e, e, d` from `s` (4 ops) and insert `c, o, a, s, t` into `s` (3 ops). |
| "abc" | "def" | 6 | Delete all three characters from each string (3+3). |

## Approach
The problem reduces to counting the frequency difference of each character between the two strings. The sum of absolute differences gives the total number of deletions needed; each deletion can be paired with an insertion, so the total steps equal the sum of absolute differences.

### Pseudocode
```text
FUNCTION minSteps(s, t):
    // Count frequencies of characters in s
    SET freqS[26] ← ARRAY OF ZEROES
    FOR ch IN s:
        SET idx ← ASCII(ch) - ASCII('a')
        INCREMENT freqS[idx]
    // Count frequencies of characters in t
    SET freqT[26] ← ARRAY OF ZEROES
    FOR ch IN t:
        SET idx ← ASCII(ch) - ASCII('a')
        INCREMENT freqT[idx]
    // Compute total difference
    SET steps ← 0
    FOR i ← 0 TO 25:
        SET steps ← steps + ABS(freqS[i] - freqT[i])
    RETURN steps
```

## Walkthrough
Consider `s = "leetcode"`, `t = "coats"`.
1. Frequency of `s`: `{l:1, e:2, t:1, c:1, o:1, d:1}`.
2. Frequency of `t`: `{c:1, o:1, a:1, t:1, s:1}`.
3. Absolute differences sum to `7` (delete `l, e, e, d` and insert `a, s, t`).
The algorithm correctly returns `7`.

## Complexity Analysis
- **Time:** O(n + m) where n and m are lengths of `s` and `t`.
- **Space:** O(1) – fixed size array of 26 integers.

## Follow-Up Questions
- How would the solution change if the strings could contain Unicode characters?
- Can you extend the approach to compute the minimum number of swaps instead of deletions/insertions?
- What if the operation cost differs for insertion vs deletion?

## Key Takeaway
Counting character frequency differences directly yields the minimum steps to make two strings anagrams.
