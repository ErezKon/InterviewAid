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

```text
FUNCTION isScramble(s1, s2):
    // Base cases
    IF s1 == s2: RETURN true
    IF SORTED(s1) != SORTED(s2): RETURN false

    n ← LENGTH(s1)
    FOR i ← 1 TO n - 1:
        // No swap case
        IF isScramble(s1[0:i], s2[0:i]) AND isScramble(s1[i:], s2[i:]):
            RETURN true
        // Swap case
        IF isScramble(s1[0:i], s2[n-i:]) AND isScramble(s1[i:], s2[0:n-i]):
            RETURN true
    RETURN false
```

Memoize results of `(s1, s2)` to avoid recomputation.

---

## Examples

| s1 | s2 | Output | Explanation |
|----|----|--------|-------------|
| `"great"` | `"rgeat"` | `true` | Split at index 2, swap halves gives `rgeat`. |
| `"abcde"` | `"caebd"` | `false` | No sequence of splits and swaps matches. |
| `"a"` | `"a"` | `true` | Single character strings are identical. |

---

## Walkthrough

Take `s1 = "great"`, `s2 = "rgeat"`:

1. Characters match in multiset, continue.
2. Try split at `i = 1`:
   - No‑swap: `"g"` vs `"r"` → false.
   - Swap: `"g"` vs `"t"` → false.
3. Split at `i = 2`:
   - No‑swap: `"gr"` vs `"rg"` (false) and `"eat"` vs `"eat"` (true) → overall false.
   - Swap: `"gr"` vs `"at"` (false) and `"eat"` vs `"rg"` (false).
4. Split at `i = 3`:
   - No‑swap: `"gre"` vs `"rge"` (true after deeper recursion) and `"at"` vs `"at"` (true) → both true → return true.

Thus `"rgeat"` is a scrambled version of `"great"`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n⁴) (with memoization) | O(n³) cache entries |

The recursion explores all split points; memoization reduces repeated work.

---

## Follow-Up Questions

- Can the solution be improved to O(n³) using DP table formulation?
- How would you adapt the algorithm for strings with Unicode characters?
- What changes are needed if the scramble operation allows rotating substrings?

---

## Key Takeaway

> Scramble String is a divide‑and‑conquer problem with two branching choices (swap or not) at each split point — memoization is essential to avoid exponential blowup.
