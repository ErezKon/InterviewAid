# 880. Decoded String at Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decoded-string-at-index](https://leetcode.com/problems/decoded-string-at-index)
**Companies:** Amazon, Bloomberg, Meta, National Instruments, Phonepe

---

## Problem Description

Given an encoded string consisting of lowercase letters and digits, where each digit `d` means the current decoded string is repeated `d` times, find the `k`‑th character of the fully decoded string without constructing it.

## Examples

| s | k | output |
|---|---|---|
| "leet2code3" | 10 | "o" |
| "ha22" | 5 | "h" |
| "a2345678999999999999999" | 1 | "a" |

*Explanation*: In the first example, the decoded string is "leetleetcodeleetleetcodeleetleetcode"; the 10th character is "o".

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