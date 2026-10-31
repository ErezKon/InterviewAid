# 87. Scramble String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/scramble-string](https://leetcode.com/problems/scramble-string)
**Companies:** Amazon, Bloomberg, Darwinbox, Google, Meta, Rubrik

---

## Problem Description

We can scramble a string `s` to get a string `t` using the following algorithm:

1. If the length of the string is 1, stop.
2. If the length of the string is > 1, do the following:
   - Split the string into two non-empty substrings at a random index, i.e., if the string is `s`, divide it to `x` and `y` where `s = x + y`.
   - **Randomly** decide to swap the two substrings or to keep them in the same order. i.e., after this step, `s` may become `s = x + y` or `s = y + x`.
   - Apply step 1 recursively on each of the two substrings `x` and `y`.

Given two strings `s1` and `s2` of **the same length**, return `true` if `s2` is a scrambled string of `s1`, otherwise, return `false`.

**Constraints:**

- `s1.length == s2.length`
- `1 <= s1.length <= 30`
- `s1` and `s2` consist of lowercase English letters.

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

```
Example 1:
  Input: s1 = "great", s2 = "rgeat"
  Output: true
  Explanation: One possible scenario applied on s1 is:
  "great" --> "gr/eat" // divide at random index.
  "gr/eat" --> "gr/eat" // random decision is not to swap the two substrings and keep them in order.
  "gr/eat" --> "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at random index each of them.
  "g/r / e/at" --> "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
  "r/g / e/at" --> "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
  "r/g / e/ a/t" --> "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
  The algorithm stops now, and the result string is "rgeat" which is s2.
  As one possible scenario led s1 to be scrambled to s2, we return true.
```

```
Example 2:
  Input: s1 = "abcde", s2 = "caebd"
  Output: false
```

```
Example 3:
  Input: s1 = "a", s2 = "a"
  Output: true
```

---

## Walkthrough

Take `s1 = "great"`, `s2 = "rgeat"`:

1. Characters match in multiset, continue.
2. Try split at `i = 1`:
   - No-swap: `"g"` vs `"r"` → false.
   - Swap: `"g"` vs `"t"` → false.
3. Split at `i = 2`:
   - No-swap: `"gr"` vs `"rg"` (false) and `"eat"` vs `"eat"` (true) → overall false.
   - Swap: `"gr"` vs `"at"` (false) and `"eat"` vs `"rg"` (false).
4. Split at `i = 3`:
   - No-swap: `"gre"` vs `"rge"` (true after deeper recursion) and `"at"` vs `"at"` (true) → both true → return true.

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

> Scramble String is a divide-and-conquer problem with two branching choices (swap or not) at each split point — memoization is essential to avoid exponential blowup.
