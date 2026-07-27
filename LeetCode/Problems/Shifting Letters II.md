# 2381. Shifting Letters II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shifting-letters-ii](https://leetcode.com/problems/shifting-letters-ii)
**Companies:** Amazon, Google, Meta, Microsoft, Veritas, Zeta

---

## Problem Description

Given string `s` and range shifts `[start, end, direction]`, apply all shifts simultaneously. Direction 1 = forward, 0 = backward in the alphabet.

---

## Key Insight

> Use a **difference array** to batch all range updates in O(1) each, then prefix sum to get the net shift per character.

---

## Approach: Difference Array — O(n) ✅

```
FUNCTION shiftingLetters(s, shifts):
    n = len(s)
    diff = [0] * (n + 1)

    FOR [start, end, direction] IN shifts:
        d = 1 IF direction == 1 ELSE -1
        diff[start] += d
        diff[end + 1] -= d

    // Prefix sum to get actual shifts
    result = list(s)
    shift = 0
    FOR i ← 0 TO n - 1:
        shift += diff[i]
        result[i] = chr((ord(s[i]) - ord('a') + shift % 26 + 26) % 26 + ord('a'))

    RETURN JOIN(result)
```
