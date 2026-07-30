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

```text
FUNCTION reverseVowels(s):
    vowels ← SET('a','e','i','o','u','A','E','I','O','U')
    chars ← LIST(s)
    lo, hi ← 0, len(chars) - 1
    WHILE lo < hi:
        WHILE lo < hi AND chars[lo] NOT IN vowels:
            lo ← lo + 1
        WHILE lo < hi AND chars[hi] NOT IN vowels:
            hi ← hi - 1
        // swap the two vowels
        SET temp ← chars[lo]
        SET chars[lo] ← chars[hi]
        SET chars[hi] ← temp
        lo ← lo + 1
        hi ← hi - 1
    RETURN JOIN(chars)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

| Input | Output |
|-------|--------|
| "hello" | "holle" |
| "leetcode" | "leotcede" |
| "aA" | "Aa" |

---

## 4. Walkthrough

Take `s = "leetcode"`.
1. Convert to list: `['l','e','e','t','c','o','d','e']`.
2. `lo` starts at 0, `hi` at 7.
3. Move `lo` to index 1 (`'e'` is a vowel). Move `hi` left to index 5 (`'o'`).
4. Swap `'e'` and `'o'` → `['l','o','e','t','c','e','d','e']`.
5. Increment `lo` to 2, decrement `hi` to 4.
6. `lo` at 2 (`'e'` vowel), `hi` at 4 (`'c'` not vowel) → move `hi` to 3 (`'t'`), then to 2, stop.
7. Loop ends as `lo >= hi`. Join list → `"leotcede"`.

---

## 5. Complexity Analysis

- **Time:** Each character is examined at most twice, giving O(n).
- **Space:** The character list uses O(n) extra space.

---

## Key Takeaway

> Same two-pointer skip pattern as Reverse Only Letters — advance past non‑matching characters, swap matching ones from both ends.
