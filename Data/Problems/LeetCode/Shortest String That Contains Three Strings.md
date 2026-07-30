# 2800. Shortest String That Contains Three Strings

**Difficulty:** 🟡 Medium

**Companies:** Bloomberg, De Shaw, Google
---

## Problem Description

Given three strings, find the shortest string that contains all three as substrings. If tied, return the lexicographically smallest.

---

## Approach

```
FUNCTION minimumString(a, b, c):
    // Try all 6 permutations of (a, b, c)
    // For each permutation, greedily merge: overlap s1+s2, then result+s3
    // Return shortest, then lexicographically smallest

FUNCTION merge(s1, s2):
    IF s2 IN s1: RETURN s1
    // Find max overlap where s1 ends and s2 begins
    FOR i ← MAX(0, len(s1)-len(s2)) TO len(s1):
        IF s2.startswith(s1[i:]): RETURN s1[:i] + s2
    RETURN s1 + s2
```

---

## Examples

**Example 1:**
```
Input: a = "abc", b = "bca", c = "aaa"
Output: "abca"
Explanation: "abca" contains "abc", "bca", and "aaa" as substrings and is the shortest possible.
```

**Example 2:**
```
Input: a = "cat", b = "dog", c = "bird"
Output: "catdogbird"
Explanation: No overlaps exist, so concatenating all three yields the shortest string.
```

---

## Walkthrough

| Step | Prefix | Action |
|------|--------|--------|
| 1 | "abc" | Start with first string.
| 2 | Merge with "bca" | Overlap "bc" → result "abca".
| 3 | Merge with "aaa" | No overlap, append → "abca" + "aaa" = "abca" (since "aaa" is already a substring of "abca").

The algorithm tries all orderings and picks the minimal result.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) — 6 permutations × merge cost | O(n) |

---

## Follow-Up Questions

1. How would you extend the solution to handle **k** strings instead of three?
2. Can you improve the time complexity using advanced string data structures like a suffix automaton?

---

## Key Takeaway

> Only 6 permutations to try (3!). For each ordering, greedily merge with maximum suffix‑prefix overlap. Pick the best result.
