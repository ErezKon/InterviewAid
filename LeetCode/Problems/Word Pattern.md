# 290. Word Pattern

**Difficulty:** 🟢 Easy
**Acceptance:** 44.0%
**LeetCode:** [https://leetcode.com/problems/word-pattern](https://leetcode.com/problems/word-pattern)
**Companies:** Amazon, Bloomberg, Dropbox, Google, Meta, Microsoft, Nvidia, Uber, Zoho

---

## 1. Problem Description

Given a `pattern` and a string `s`, check if `s` follows the same pattern (bijection between letters and words).

---

## 2. Approach: Two Hash Maps — O(n) ✅

```
FUNCTION wordPattern(pattern, s):
    words = s.SPLIT(' ')
    IF len(pattern) != len(words): RETURN false

    charToWord = {}
    wordToChar = {}

    FOR i ← 0 TO len(pattern) - 1:
        c = pattern[i]
        w = words[i]

        IF c IN charToWord AND charToWord[c] != w: RETURN false
        IF w IN wordToChar AND wordToChar[w] != c: RETURN false

        charToWord[c] = w
        wordToChar[w] = c

    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Bijection checking requires two maps (or a map + a set). One-directional mapping misses cases like pattern="ab", s="dog dog".
