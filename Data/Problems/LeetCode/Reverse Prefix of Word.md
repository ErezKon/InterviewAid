# 2000. Reverse Prefix of Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-prefix-of-word](https://leetcode.com/problems/reverse-prefix-of-word)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Optum

---

## Problem Description

Given a string `word` and a character `ch`, reverse the prefix of `word` up to and including the **first occurrence** of `ch`. If `ch` doesn't exist, return `word` unchanged.

---

## Examples

**Example 1:**
```
Input: word = "abcdefd", ch = "d"
Output: "dcbaefd"
Explanation: The first 'd' occurs at index 3. Reverse "abcd" → "dcba" and concatenate the rest.
```

**Example 2:**
```
Input: word = "xyxzxe", ch = "z"
Output: "zxyxxe"
Explanation: First 'z' at index 3. Reverse "xyxz" → "zxyx".
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
