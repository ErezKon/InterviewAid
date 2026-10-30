# 2186. Minimum Number of Steps to Make Two Strings Anagram II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram-ii](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram-ii)
**Companies:** Wealthfront

---

## Problem Description

You are given two strings `s` and `t`. In one step, you can append **any character** to either `s` or `t`.

Return *the minimum number of steps to make *`s`* and *`t`* **anagrams** of each other.*

An **anagram** of a string is a string that contains the same characters with a different (or the same) ordering.

**Constraints:**
- `1 <= s.length, t.length <= 2 * 10^5`
- `s` and `t` consist of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "leetcode", t = "coats"
Output: 7
Explanation: - In 2 steps, we can append the letters in "as" onto s = "leetcode", forming s = "leetcodeas".
- In 5 steps, we can append the letters in "leede" onto t = "coats", forming t = "coatsleede".
"leetcodeas" and "coatsleede" are now anagrams of each other.
We used a total of 2 + 5 = 7 steps.
It can be shown that there is no way to make them anagrams of each other with less than 7 steps.
```

**Example 2:**
```
Input: s = "night", t = "thing"
Output: 0
Explanation: The given strings are already anagrams of each other. Thus, we do not need any further steps.
```

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
