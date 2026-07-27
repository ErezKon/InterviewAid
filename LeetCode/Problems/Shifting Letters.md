# 848. Shifting Letters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shifting-letters](https://leetcode.com/problems/shifting-letters)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given string `s` and array `shifts`, shift the first `i+1` characters by `shifts[i]` positions forward in the alphabet.

---

## Approach

```
FUNCTION shiftingLetters(s, shifts):
    total = SUM(shifts)
    result = list(s)
    FOR i ← 0 TO n - 1:
        result[i] = chr((ord(s[i]) - ord('a') + total) % 26 + ord('a'))
        total -= shifts[i]
    RETURN JOIN(result)
```

Suffix sum of shifts. Each character `s[i]` shifts by `sum(shifts[i:])`.

| Time | Space |
|------|-------|
| O(n) | O(n) |
