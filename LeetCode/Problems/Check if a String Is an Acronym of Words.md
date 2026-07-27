# 2828. Check if a String Is an Acronym of Words

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-a-string-is-an-acronym-of-words](https://leetcode.com/problems/check-if-a-string-is-an-acronym-of-words)
**Companies:** Amazon, Uber

---

## 1. Problem Description

Given an array of strings `words` and a string `s`, return `true` if `s` is an acronym of `words` — i.e., `s` is formed by concatenating the first character of each word in order.

---

## 2. Approach: Compare First Characters — O(n) ✅

```
FUNCTION isAcronym(words, s):
    IF len(s) != len(words): RETURN false
    FOR i FROM 0 TO len(words) - 1:
        IF words[i][0] != s[i]: RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Simple length check + character-by-character comparison of first letters against the acronym string.
