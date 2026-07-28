# 796. Rotate String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rotate-string](https://leetcode.com/problems/rotate-string)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Natwest, Oracle, Rivian, Tcs, Wells Fargo, Zoho

---

## Problem Description

Given strings `s` and `goal`, return `true` if `goal` is a rotation of `s` (e.g., "abcde" rotated by 2 gives "cdeab").

---

## Examples

| s | goal | Output |
|---|------|--------|
| "abcde" | "cdeab" | true |
| "abcde" | "abced" | false |
| "" | "" | true |

*Explanation*: Concatenating `s` with itself yields all possible rotations; checking if `goal` is a substring determines rotation.

---

## Approach

```
FUNCTION rotateString(s, goal):
    // Ensure same length
    IF LENGTH(s) != LENGTH(goal):
        RETURN false
    // Check if goal appears in s concatenated with itself
    RETURN goal IN (s + s)
```

`s + s` contains every rotation of `s`. The substring check validates rotation.

---

## Walkthrough

Consider `s = "abcde"`, `goal = "cdeab"`.
1. Verify lengths are equal (both 5).
2. Compute `s + s = "abcdeabcde"`.
3. Search for `goal` (`"cdeab"`) in `"abcdeabcde"` → found starting at index 2.
4. Since `goal` is a substring, return `true`.

If `goal = "abced"`, it does not appear in `"abcdeabcde"`, so return `false`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

The substring search scans at most `2n` characters; additional space holds the concatenated string.

---

## Follow-Up Questions

1. How would you solve the problem without extra space for `s + s`?
2. Can you generalize the approach to check rotations for arrays of integers?

---

## Key Takeaway

> The classic rotation check: `s + s` contains every rotation of `s` as a contiguous substring. Length check prevents false positives.
