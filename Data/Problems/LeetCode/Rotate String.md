# 796. Rotate String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rotate-string](https://leetcode.com/problems/rotate-string)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Natwest, Oracle, Rivian, Tcs, Wells Fargo, Zoho

---

## Problem Description

Given two strings `s` and `goal`, return `true` *if and only if* `s` *can become* `goal` *after some number of **shifts** on* `s`.

A **shift** on `s` consists of moving the leftmost character of `s` to the rightmost position.

- For example, if `s = "abcde"`, then it will be `"bcdea"` after one shift.

**Constraints:**
- `1 <= s.length, goal.length <= 100`
- `s` and `goal` consist of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: s = "abcde", goal = "cdeab"
Output: true
```

**Example 2:**
```
Input: s = "abcde", goal = "abced"
Output: false
```

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
