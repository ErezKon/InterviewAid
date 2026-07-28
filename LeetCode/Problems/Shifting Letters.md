# 848. Shifting Letters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shifting-letters](https://leetcode.com/problems/shifting-letters)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given a string `s` and an integer array `shifts` of the same length, shift the first `i+1` characters of `s` forward in the alphabet by `shifts[i]` positions (wrapping from `z` to `a`). Return the resulting string after applying all shifts.

---

## Examples

**Example 1:**
```
Input: s = "abc", shifts = [3,5,9]
Output: "rpl"
Explanation:
- After first shift: shift first 1 char by 3 → "dbc"
- After second shift: shift first 2 chars by 5 → "igc"
- After third shift: shift first 3 chars by 9 → "rpl"
```

**Example 2:**
```
Input: s = "aaa", shifts = [1,2,3]
Output: "gfd"
Explanation: Cumulative shifts are [6,5,3] → "gfd".
```

---

## Approach

```
FUNCTION shiftingLetters(s, shifts):
    total ← SUM(shifts)               // total shift for first character
    result ← LIST(s)
    FOR i ← 0 TO LENGTH(s) - 1:
        shift ← total % 26
        result[i] ← CHAR((ORD(s[i]) - ORD('a') + shift) % 26 + ORD('a'))
        total ← total - shifts[i]    // remove shift contributed by position i
    RETURN JOIN(result)
```

The suffix‑sum of `shifts` gives the net shift for each position.

---

## Walkthrough

| Index | Original char | Cumulative shift | New char |
|-------|---------------|------------------|----------|
| 0 | a | 6 (3+5+9) % 26 = 6 | g |
| 1 | b | 5 (5+9) % 26 = 5 | f |
| 2 | c | 3 % 26 = 3 | d |

Resulting string: "gfd".

---

## Complexity Analysis

- **Time:** O(n) – one pass to compute the suffix sum and transform characters.
- **Space:** O(n) – result list stores the transformed characters.

---

## Follow‑Up Questions

1. How would you modify the algorithm to handle **left shifts** instead of right shifts?
2. Can the solution be extended to work with **Unicode** characters beyond the English alphabet?
3. What if the `shifts` array is **streamed** and cannot be stored entirely in memory?

---

## Key Takeaway

> Compute a suffix sum of the shift amounts so each character’s net shift is known in O(1), then apply modular arithmetic to rotate letters.
