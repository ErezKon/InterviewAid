# 2000. Reverse Prefix of Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-prefix-of-word](https://leetcode.com/problems/reverse-prefix-of-word)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Optum

---

## Problem Description

Given a **0-indexed** string `word` and a character `ch`, **reverse** the segment of `word` that starts at index `0` and ends at the index of the **first occurrence** of `ch` (**inclusive**). If the character `ch` does not exist in `word`, do nothing.

- For example, if `word = "abcdefd"` and `ch = "d"`, then you should **reverse** the segment that starts at `0` and ends at `3` (**inclusive**). The resulting string will be `"dcbaefd"`.

Return *the resulting string*.

**Constraints:**
- `1 <= word.length <= 250`
- `word` consists of lowercase English letters.
- `ch` is a lowercase English letter.

---

## Examples

**Example 1:**
```
Input: word = "abcdefd", ch = "d"
Output: "dcbaefd"
Explanation: The first occurrence of "d" is at index 3.
Reverse the part of word from 0 to 3 (inclusive), the resulting string is "dcbaefd".
```

**Example 2:**
```
Input: word = "xyxzxe", ch = "z"
Output: "zxyxxe"
Explanation: The first and only occurrence of "z" is at index 3.
Reverse the part of word from 0 to 3 (inclusive), the resulting string is "zxyxxe".
```

**Example 3:**
```
Input: word = "abcd", ch = "z"
Output: "abcd"
Explanation: "z" does not exist in word.
You should not do any reverse operation, the resulting string is "abcd".
```

---

## Approach

```
FUNCTION reversePrefix(word, ch):
    idx ← FIND_FIRST(word, ch)
    IF idx == -1:
        RETURN word
    prefix ← SUBSTRING(word, 0, idx + 1)
    suffix ← SUBSTRING(word, idx + 1)
    reversedPrefix ← REVERSE(prefix)
    RETURN CONCAT(reversedPrefix, suffix)
```

---

## Walkthrough

Take `word = "abcdefd", ch = "d"`:
1. Find first 'd' → index 3.
2. Prefix = "abcd", suffix = "efd".
3. Reverse prefix → "dcba".
4. Concatenate → "dcba" + "efd" = "dcbaefd".

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — single pass to find `ch` and reverse prefix |
| Space  | O(n) — new string created for result |

---

## Follow-Up Questions

1. How would you perform the operation in‑place on a mutable character array?
2. How to handle Unicode characters that may occupy multiple code units?

---

## Key Takeaway

> Locate the target character, reverse the substring up to that point, and re‑attach the remainder — a simple pattern for prefix‑based string transformations.
