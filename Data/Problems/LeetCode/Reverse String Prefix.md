# 3794. Reverse String Prefix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-string-prefix](https://leetcode.com/problems/reverse-string-prefix)
**Companies:** Amazon

---

## Problem Description

Given a string `s` and an integer `k`, reverse the first `k` characters of `s`. If `k` exceeds the length of `s`, reverse the entire string.

---

## Examples

**Example 1:**
```
Input: s = "abcdef", k = 3
Output: "cbadef"
Explanation: Reverse the first three characters "abc" → "cba" and concatenate with the remainder "def".
```

**Example 2:**
```
Input: s = "hello", k = 10
Output: "olleh"
Explanation: k exceeds length, so the whole string is reversed.
```

---

## Approach

```
FUNCTION reversePrefix(s, k):
    IF k > LENGTH(s):
        k ← LENGTH(s)
    prefix ← SUBSTRING(s, 0, k)
    suffix ← SUBSTRING(s, k)
    reversedPrefix ← REVERSE(prefix)
    RETURN CONCAT(reversedPrefix, suffix)
```

---

## Walkthrough

Take `s = "abcdef", k = 3`:
1. `k` ≤ length, keep `k = 3`.
2. `prefix = "abc"`, `suffix = "def"`.
3. `reversedPrefix = "cba"`.
4. Result = `"cba" + "def" = "cbadef"`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — one pass to reverse the prefix and copy the rest |
| Space  | O(n) — new string created for the result |

---

## Follow-Up Questions

1. How would you perform the reversal in‑place if the string were mutable?
2. How to handle Unicode characters that may consist of multiple code units?

---

## Key Takeaway

> Simple slice‑and‑reverse — take the first `k` characters, reverse them, and concatenate with the remainder.
