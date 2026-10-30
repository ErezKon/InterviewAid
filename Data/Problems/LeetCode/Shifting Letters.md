# 848. Shifting Letters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shifting-letters](https://leetcode.com/problems/shifting-letters)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given a string `s` of lowercase English letters and an integer array `shifts` of the same length.

Call the `shift()` of a letter, the next letter in the alphabet, (wrapping around so that `'z'` becomes `'a'`).

- For example, `shift('a') = 'b'`, `shift('t') = 'u'`, and `shift('z') = 'a'`.

Now for each `shifts[i] = x`, we want to shift the first `i + 1` letters of `s`, `x` times.

Return *the final string after all such shifts to s are applied*.

**Constraints:**

- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.
- `shifts.length == s.length`
- `0 <= shifts[i] <= 10^9`

---

## Examples

```
Example 1:
  Input: s = "abc", shifts = [3,5,9]
  Output: "rpl"
  Explanation: We start with "abc".
  After shifting the first 1 letters of s by 3, we have "dbc".
  After shifting the first 2 letters of s by 5, we have "igc".
  After shifting the first 3 letters of s by 9, we have "rpl", the answer.
```

```
Example 2:
  Input: s = "aaa", shifts = [1,2,3]
  Output: "gfd"
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
