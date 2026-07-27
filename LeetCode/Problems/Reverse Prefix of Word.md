# 2000. Reverse Prefix of Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-prefix-of-word](https://leetcode.com/problems/reverse-prefix-of-word)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Optum

---

## Problem Description

Given a string `word` and a character `ch`, reverse the prefix of `word` up to and including the **first occurrence** of `ch`. If `ch` doesn't exist, return `word` unchanged.

---

## Approach

```
FUNCTION reversePrefix(word, ch):
    idx = word.find(ch)
    IF idx == -1: RETURN word
    RETURN word[:idx+1][::-1] + word[idx+1:]
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Find the target character's index, then reverse the substring `[0..idx]` — a one-liner in most languages using slice + reverse.
