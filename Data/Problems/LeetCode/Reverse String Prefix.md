# 3794. Reverse String Prefix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-string-prefix](https://leetcode.com/problems/reverse-string-prefix)
**Companies:** Amazon

---

## Problem Description

You are given a string `s` and an integer `k`.

Reverse the first `k` characters of `s` and return the resulting string.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.
- `1 <= k <= s.length`

---

## Examples

**Example 1:**
```
Input: s = "abcd", k = 2
Output: "bacd"
Explanation:
The first k = 2 characters "ab" are reversed to "ba". The final resulting string is "bacd".
```

**Example 2:**
```
Input: s = "xyz", k = 3
Output: "zyx"
Explanation:
The first k = 3 characters "xyz" are reversed to "zyx". The final resulting string is "zyx".
```

**Example 3:**
```
Input: s = "hey", k = 1
Output: "hey"
Explanation:
The first k = 1 character "h" remains unchanged on reversal. The final resulting string is "hey".
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
