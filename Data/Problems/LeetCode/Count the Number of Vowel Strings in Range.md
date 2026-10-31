# 2586. Count the Number of Vowel Strings in Range

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range](https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range)
**Companies:** Paypal

---

## Problem Description

You are given a **0-indexed** array of string `words` and two integers `left` and `right`.

A string is called a **vowel string** if it starts with a vowel character and ends with a vowel character where vowel characters are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

Return *the number of vowel strings* `words[i]` *where* `i` *belongs to the inclusive range* `[left, right]`.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 10`
- `words[i]` consists of only lowercase English letters.
- `0 <= left <= right < words.length`

---

## Examples

```
Example 1:
  Input: words = ["are","amy","u"], left = 0, right = 2
  Output: 2
  Explanation:
  - "are" is a vowel string because it starts with 'a' and ends with 'e'.
  - "amy" is not a vowel string because it does not end with a vowel.
  - "u" is a vowel string because it starts with 'u' and ends with 'u'.
  The number of vowel strings in the mentioned range is 2.
```

```
Example 2:
  Input: words = ["hey","aeo","mu","ooo","artro"], left = 1, right = 4
  Output: 3
  Explanation:
  - "aeo" is a vowel string because it starts with 'a' and ends with 'o'.
  - "mu" is not a vowel string because it does not start with a vowel.
  - "ooo" is a vowel string because it starts with 'o' and ends with 'o'.
  - "artro" is a vowel string because it starts with 'a' and ends with 'o'.
  The number of vowel strings in the mentioned range is 3.
```

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

1. How would you modify the solution to handle case-insensitive vowels?
2. Can you extend it to count strings that contain at least one vowel anywhere?
3. What if the query range is updated frequently—how would you support fast updates?

---

## Key Takeaway

> **Simple iteration with vowel set lookup. Check first and last character of each word in the given range.**