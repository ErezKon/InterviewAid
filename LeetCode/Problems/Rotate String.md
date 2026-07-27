# 796. Rotate String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rotate-string](https://leetcode.com/problems/rotate-string)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Natwest, Oracle, Rivian, Tcs, Wells Fargo, Zoho

---

## Problem Description

Given strings `s` and `goal`, return `true` if `goal` is a rotation of `s` (e.g., "abcde" rotated by 2 gives "cdeab").

---

## Approach

```
FUNCTION rotateString(s, goal):
    RETURN len(s) == len(goal) AND goal IN (s + s)
```

`s + s` contains all rotations of `s`. Check if `goal` is a substring.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> The classic rotation check: `s + s` contains every rotation of `s` as a contiguous substring. Length check prevents false positives.
