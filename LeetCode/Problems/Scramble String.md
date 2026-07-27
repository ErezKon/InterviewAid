# 87. Scramble String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/scramble-string](https://leetcode.com/problems/scramble-string)
**Companies:** Amazon, Bloomberg, Darwinbox, Google, Meta, Rubrik

---

## Problem Description

A string can be "scrambled" by splitting it into two non-empty parts at any index, optionally swapping them, then recursively scrambling each part. Given `s1` and `s2`, return `true` if `s2` is a scrambled version of `s1`.

---

## Key Insight

> At each level, try all split points. For each split, either the two halves correspond directly (no swap) or are swapped. Prune early by checking character frequency match.

---

## Approach: Recursion + Memoization — O(n⁴) ✅

```
FUNCTION isScramble(s1, s2):
    IF s1 == s2: RETURN true
    IF sorted(s1) != sorted(s2): RETURN false

    n = len(s1)
    FOR i ← 1 TO n - 1:
        // No swap
        IF isScramble(s1[:i], s2[:i]) AND isScramble(s1[i:], s2[i:]):
            RETURN true
        // Swap
        IF isScramble(s1[:i], s2[n-i:]) AND isScramble(s1[i:], s2[:n-i]):
            RETURN true

    RETURN false
```

Try all split points. Either the two halves map directly or are swapped. Memoize on `(s1, s2)` pairs.

| Time | Space |
|------|-------|
| O(n⁴) with memoization | O(n³) cache entries |

---

## Key Takeaway

> Scramble String is a divide-and-conquer problem with two branching choices (swap or not) at each split point — memoization is essential to avoid exponential blowup.
