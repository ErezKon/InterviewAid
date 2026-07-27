# 2586. Count the Number of Vowel Strings in Range

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range](https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range)
**Companies:** Paypal

---

## Problem Description

Count strings in `words[left..right]` that start **and** end with a vowel (`a, e, i, o, u`).

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

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(right - left + 1) |
| **Space** | O(1) |

---

## Key Takeaway

> **Simple iteration with vowel set lookup. Check first and last character of each word in the given range.**
