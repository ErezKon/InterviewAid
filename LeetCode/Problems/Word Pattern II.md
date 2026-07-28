# 291. Word Pattern II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-pattern-ii](https://leetcode.com/problems/word-pattern-ii)
**Companies:** Amazon, Apple, Dropbox, Microsoft, Tiktok, Uber

---

## Problem Description
Given a pattern string `pattern` and a target string `s`, determine if there exists a bijective mapping between characters in `pattern` and non‑empty substrings of `s` such that concatenating the mapped substrings in order yields `s`. Each pattern character maps to a unique substring and vice‑versa.

## Examples
**Example 1:**
```
Input: pattern = "abab", s = "redblueredblue"
Output: true
Explanation: 'a' → "red", 'b' → "blue"
```
**Example 2:**
```
Input: pattern = "aaaa", s = "asdasdasdasd"
Output: true
Explanation: 'a' → "asd"
```
**Example 3:**
```
Input: pattern = "aabb", s = "xyzabcxzyabc"
Output: false
```

## Approach
Backtrack over the pattern characters, trying all possible substring assignments for unmapped characters while ensuring consistency with already‑mapped ones.

```text
FUNCTION wordPatternMatch(pattern, s):
    RETURN backtrack(pattern, s, 0, 0, {}, SET())

FUNCTION backtrack(pattern, s, pi, si, mapping, used):
    IF pi = LENGTH(pattern) AND si = LENGTH(s): RETURN true
    IF pi = LENGTH(pattern) OR si = LENGTH(s): RETURN false
    SET ch ← pattern[pi]
    IF ch IN mapping:
        SET word ← mapping[ch]
        IF NOT s STARTS_WITH word AT si: RETURN false
        RETURN backtrack(pattern, s, pi+1, si+LENGTH(word), mapping, used)
    FOR end FROM si+1 TO LENGTH(s):
        SET word ← SUBSTRING(s, si, end)
        IF word IN used: CONTINUE
        SET mapping[ch] ← word
        ADD word TO used
        IF backtrack(pattern, s, pi+1, end, mapping, used): RETURN true
        REMOVE word FROM used
        DELETE mapping[ch]
    RETURN false
```

## Walkthrough
Pattern `"abab"`, string `"redblueredblue"`:
1. Map `'a'` → `"red"` (first possible). `used = {"red"}`.
2. Map `'b'` → `"blue"`. `used = {"red","blue"}`.
3. Next `'a'` matches `"red"` at position 6, continue.
4. Next `'b'` matches `"blue"` at position 9, reach end → success.

## Complexity Analysis
- Time: O(n * m * 2^m) in worst case, where n = |s|, m = |pattern| (due to exhaustive backtracking).
- Space: O(m) for recursion stack and mapping.

## Follow‑Up Questions
1. How would you modify the algorithm to handle patterns with wildcard characters?
2. Can you improve average‑case performance using memoization of failed states?
3. How would you adapt the solution for streaming input where `s` is received incrementally?

## Key Takeaway
Backtracking with a bijective mapping efficiently explores all possible substring assignments while pruning inconsistent branches.
