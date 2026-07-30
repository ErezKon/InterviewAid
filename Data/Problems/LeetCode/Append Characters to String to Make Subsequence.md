# 2486. Append Characters to String to Make Subsequence

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Microsoft
---

## Problem Description
Given two strings `s` and `t`, determine the minimum number of characters that must be appended to the end of `s` so that `t` becomes a subsequence of the resulting string.

## Examples
**Example 1:**
```
Input: s = "abc", t = "abcbc"
Output: 2
Explanation: Append "bc" to `s` → "abcbc", now `t` is a subsequence.
```
**Example 2:**
```
Input: s = "xyz", t = "xyz"
Output: 0
Explanation: `t` is already a subsequence of `s`.
```

## Approach
Traverse `s` while matching characters of `t` using a pointer `j`. After the scan, the number of unmatched characters in `t` equals `len(t) - j`.

```text
FUNCTION appendCharacters(s, t):
    SET j ← 0
    FOR c IN s:
        IF j < LEN(t) AND c == t[j]:
            SET j ← j + 1
    RETURN LEN(t) - j
```

## Walkthrough
For `s = "abc"`, `t = "abcbc"`:
- Match `a` → j=1, match `b` → j=2, match `c` → j=3.
- End of `s`; remaining characters in `t` = 5-3 = 2.
Thus need to append 2 characters.

## Complexity Analysis
- **Time:** O(|s|) – single pass through `s`.
- **Space:** O(1) – only the pointer `j`.

## Follow‑Up Questions
1. How would you modify the algorithm to insert characters anywhere, not just at the end?
2. Can you compute the answer for multiple `t` strings efficiently?
3. What is the relationship to the Longest Common Subsequence problem?

## Key Takeaway
A greedy two‑pointer scan finds the longest prefix of `t` that appears as a subsequence in `s`; the remainder must be appended.
