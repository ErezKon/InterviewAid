# 917. Reverse Only Letters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-only-letters](https://leetcode.com/problems/reverse-only-letters)
**Companies:** Amazon, Google, Microsoft, Snowflake, Tanium, Turing

---

## Problem Description

Given a string `s`, reverse the string according to the following rules:

- All the characters that are not English letters remain in the same position.
- All the English letters (lowercase or uppercase) should be reversed.

Return `s` *after reversing it*.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of characters with ASCII values in the range `[33, 122]`.
- `s` does not contain `'\"'` or `'\\'`.

---

## Examples

**Example 1:**
```
Input: s = "ab-cd"
Output: "dc-ba"
```

**Example 2:**
```
Input: s = "a-bC-dEf-ghIj"
Output: "j-Ih-gfE-dCba"
```

**Example 3:**
```
Input: s = "Test1ng-Leet=code-Q!"
Output: "Qedo1ct-eeLg=ntse-T!"
```

---

## Approach

```
FUNCTION reverseOnlyLetters(s):
    arr ← LIST(s)
    lo ← 0
    hi ← LENGTH(arr) - 1
    WHILE lo < hi:
        WHILE lo < hi AND NOT IS_ALPHA(arr[lo]):
            lo ← lo + 1
        WHILE lo < hi AND NOT IS_ALPHA(arr[hi]):
            hi ← hi - 1
        IF lo < hi:
            SWAP(arr[lo], arr[hi])
            lo ← lo + 1
            hi ← hi - 1
    RETURN JOIN(arr)
```

---

## Walkthrough

Take `s = "a-bC-dEf-ghIj"`:
| Step | lo char | hi char | Action |
|------|---------|---------|--------|
| 1 | 'a' (letter) | 'j' (letter) | swap → "j‑bC‑dEf‑ghIa" |
| 2 | '-' (skip) | 'I' (letter) | lo moves to 'b', hi moves to 'I' → swap → "j‑I C‑dEf‑ghab" |
| 3 | 'b' (letter) | 'h' (letter) | swap → "j‑I h‑dEf‑gbab" |
| … | … | … | continue until pointers cross |
Resulting string: `"j-Ih-gfE-dCba"`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — each character visited at most once |
| Space  | O(n) — array of characters (in‑place if mutable) |

---

## Follow-Up Questions

1. How would you modify the algorithm to reverse only digits instead of letters?
2. Can you solve the problem using a stack instead of two pointers?

---

## Key Takeaway

> Two‑pointer with skip — advance pointers past non‑letter characters, then swap. The classic pattern for "reverse only elements matching a predicate."
