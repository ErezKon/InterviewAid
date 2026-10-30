# 880. Decoded String at Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decoded-string-at-index](https://leetcode.com/problems/decoded-string-at-index)
**Companies:** Amazon, Bloomberg, Meta, National Instruments, Phonepe

---

## Problem Description

You are given an encoded string `s`. To decode the string to a tape, the encoded string is read one character at a time and the following steps are taken:

- If the character read is a letter, that letter is written onto the tape.
- If the character read is a digit `d`, the entire current tape is repeatedly written `d - 1` more times in total.

Given an integer `k`, return *the* `k`<sup>th</sup> *letter (**1-indexed**) in the decoded string*.

**Constraints:**

- `2 <= s.length <= 100`
- `s` consists of lowercase English letters and digits `2` through `9`.
- `s` starts with a letter.
- `1 <= k <= 10^9`
- It is guaranteed that `k` is less than or equal to the length of the decoded string.
- The decoded string is guaranteed to have less than `2^63` letters.

## Examples

```
Example 1:
  Input: s = "leet2code3", k = 10
  Output: "o"
  Explanation: The decoded string is "leetleetcodeleetleetcodeleetleetcode".
  The 10th letter in the string is "o".
```

```
Example 2:
  Input: s = "ha22", k = 5
  Output: "h"
  Explanation: The decoded string is "hahahaha".
  The 5th letter is "h".
```

```
Example 3:
  Input: s = "a2345678999999999999999", k = 1
  Output: "a"
  Explanation: The decoded string is "a" repeated 8301530446056247680 times.
  The 1st letter is "a".
```

---

## Approach

```
FUNCTION decodeAtIndex(s, k):
    size ← 0
    FOR c IN s:
        IF c IS DIGIT:
            size ← size * INTEGER(c)
        ELSE:
            size ← size + 1
    FOR c IN REVERSED(s):
        k ← k MOD size
        IF k = 0 AND c IS LETTER:
            RETURN c
        IF c IS DIGIT:
            size ← size DIV INTEGER(c)
        ELSE:
            size ← size - 1
    RETURN ''
```

---

## Walkthrough

**Example 1** – `s = "leet2code3"`, `k = 10`
1. **Forward pass** to compute total length:
   - l → size=1, e→2, e→3, t→4, 2→size=4*2=8, c→9, o→10, d→11, e→12, 3→size=12*3=36.
2. **Backward pass**:
   - Start with `c='3'`, `size=36`. `k = 10 % 36 = 10`. Since `c` is digit, `size = 36 / 3 = 12`.
   - Next `c='e'`, `size=12`. `k = 10 % 12 = 10`. `c` is letter, decrement `size → 11`. `k != 0`.
   - Continue similarly until reaching `c='o'` with `size=10` and `k=10 % 10 = 0`. Since `k=0` and `c` is a letter, return `'o'`.
The algorithm efficiently maps `k` back through the repeated expansions.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of `s` |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the solution if the encoded string could contain uppercase letters?
2. Can the algorithm be extended to return a substring of length `m` starting at position `k`?
3. What changes are needed if the repetition factor can be larger than a single digit?

---

## Key Takeaway

> **Reverse simulation avoids building the huge decoded string. Digit multipliers shrink via division when going backward; `k %= size` maps the position into the repeated pattern.**