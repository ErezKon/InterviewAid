# 2800. Shortest String That Contains Three Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-string-that-contains-three-strings](https://leetcode.com/problems/shortest-string-that-contains-three-strings)
**Companies:** Bloomberg, De Shaw, Google

---

## Problem Description

Given three strings `a`, `b`, and `c`, your task is to find a string that has the **minimum** length and contains all three strings as **substrings**.

If there are multiple such strings, return the **lexicographically smallest** one.

Return *a string denoting the answer to the problem.*

**Notes**

- A string `a` is **lexicographically smaller** than a string `b` (of the same length) if in the first position where `a` and `b` differ, string `a` has a letter that appears **earlier** in the alphabet than the corresponding letter in `b`.
- A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `1 <= a.length, b.length, c.length <= 100`
- `a`, `b`, `c` consist only of lowercase English letters.

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
Output: "aaabca"
Explanation: We show that "aaabca" contains all the given strings: a = ans[2...4], b = ans[3..5], c = ans[0..2]. It can be shown that the length of the resulting string would be at least 6 and "aaabca" is the lexicographically smallest one.
```

**Example 2:**
```
Input: a = "ab", b = "ba", c = "aba"
Output: "aba"
Explanation: We show that the string "aba" contains all the given strings: a = ans[0..1], b = ans[1..2], c = ans[0..2]. Since the length of c is 3, the length of the resulting string would be at least 3. It can be shown that "aba" is the lexicographically smallest one.
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
