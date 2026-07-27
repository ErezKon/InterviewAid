# 345. Reverse Vowels of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-vowels-of-a-string](https://leetcode.com/problems/reverse-vowels-of-a-string)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Epam Systems, Google, Meta, Microsoft, Oracle, Twitch, Visa, Zoho

---

## Problem Description

Given a string `s`, reverse only the **vowels** (a, e, i, o, u — both cases), leaving all other characters in place.

- **Example:** `"hello"` → `"holle"`, `"leetcode"` → `"leotcede"`

---

## Approach

```
FUNCTION reverseVowels(s):
    vowels = set('aeiouAEIOU')
    s = list(s)
    lo, hi = 0, len(s) - 1

    WHILE lo < hi:
        WHILE lo < hi AND s[lo] NOT IN vowels: lo += 1
        WHILE lo < hi AND s[hi] NOT IN vowels: hi -= 1
        SWAP(s[lo], s[hi])
        lo += 1; hi -= 1

    RETURN JOIN(s)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Same two-pointer skip pattern as Reverse Only Letters — advance past non-matching characters, swap matching ones from both ends.
