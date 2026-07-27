# 880. Decoded String at Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decoded-string-at-index](https://leetcode.com/problems/decoded-string-at-index)
**Companies:** Amazon, Bloomberg, Meta, National Instruments, Phonepe

---

## Problem Description

Given an encoded string (letters + digits where a digit `d` repeats the preceding decoded string `d` times), find the `k`-th character without fully decoding.

---

## Key Insight

Compute total decoded length forward. Then work **backwards**: when hitting a digit, the string was repeated so `k %= size`; when hitting a letter, `size--` and check if `k == 0`.

---

## Approach

```
FUNCTION decodeAtIndex(s, k):
    size = 0
    FOR c IN s:
        IF c.isdigit(): size *= int(c)
        ELSE: size += 1

    FOR c IN reversed(s):
        k %= size
        IF k == 0 AND c.isalpha(): RETURN c
        IF c.isdigit(): size /= int(c)
        ELSE: size -= 1
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of encoded string |
| **Space** | O(1) |

---

## Key Takeaway

> **Reverse simulation avoids building the huge decoded string. Digit multipliers shrink via division when going backward; `k %= size` maps the position into the repeated pattern.**
