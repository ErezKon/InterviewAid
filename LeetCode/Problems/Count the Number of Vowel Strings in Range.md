# 2586. Count the Number of Vowel Strings in Range

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range](https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range)
**Companies:** Paypal

---

## Problem Description

Count strings in `words[left..right]` that start **and** end with a vowel (`a, e, i, o, u`).

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `words = ["are","amy","ufo","ewe"], left = 0, right = 2` | `2` | "are" and "amy" start and end with vowels. "ufo" does not end with a vowel. |
| `words = ["apple","banana","orange"], left = 1, right = 2` | `1` | Only "orange" satisfies the condition.

---

## Approach

```
FUNCTION vowelStrings(words, left, right):
    vowels = SET("aeiou")
    count = 0
    FOR i ← left TO right DO
        IF words[i][0] IN vowels AND words[i][-1] IN vowels:
            count += 1
    RETURN count
```

---

## Walkthrough

Consider `words = ["are","amy","ufo","ewe"], left = 0, right = 2`.

| i | word | first char | last char | vowel? | count |
|---|------|------------|-----------|--------|-------|
| 0 | are  | a (vowel)  | e (vowel) | yes    | 1 |
| 1 | amy  | a (vowel)  | y (not vowel) | no | 1 |
| 2 | ufo  | u (vowel)  | o (vowel) | yes    | 2 |

Final count = 2.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(right - left + 1) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you modify the solution to handle case‑insensitive vowels?
2. Can you extend it to count strings that contain at least one vowel anywhere?
3. What if the query range is updated frequently—how would you support fast updates?

---

## Key Takeaway

> **Simple iteration with vowel set lookup. Check first and last character of each word in the given range.**