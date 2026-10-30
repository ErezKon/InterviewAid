# 2486. Append Characters to String to Make Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/append-characters-to-string-to-make-subsequence](https://leetcode.com/problems/append-characters-to-string-to-make-subsequence)
**Companies:** Amazon, Google, Microsoft
---

## Problem Description
You are given two strings `s` and `t` consisting of only lowercase English letters.

Return *the minimum number of characters that need to be appended to the end of* `s` *so that* `t` *becomes a **subsequence** of* `s`.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

**Constraints:**
- `1 <= s.length, t.length <= 10^5`
- `s` and `t` consist only of lowercase English letters.

## Examples
```
Example 1:
  Input: s = "coaching", t = "coding"
  Output: 4
  Explanation: Append the characters "ding" to the end of s so that s = "coachingding".
  Now, t is a subsequence of s ("co" + "aching" + "ding").
  It can be shown that appending any 3 characters to the end of s will never make t a subsequence.
```
```
Example 2:
  Input: s = "abcde", t = "a"
  Output: 0
  Explanation: t is already a subsequence of s ("abcde").
```
```
Example 3:
  Input: s = "z", t = "abcde"
  Output: 5
  Explanation: Append the characters "abcde" to the end of s so that s = "zabcde".
  Now, t is a subsequence of s ("z" + "abcde").
  It can be shown that appending any 4 characters to the end of s will never make t a subsequence.
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
