# 1961. Check If String Is a Prefix of Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-string-is-a-prefix-of-array](https://leetcode.com/problems/check-if-string-is-a-prefix-of-array)
**Companies:** Uber

---

## 1. Problem Description

Given a string `s` and an array of strings `words`, return `true` if `s` is a prefix of the concatenation of `words` (i.e., `s == words[0] + words[1] + ... + words[k]` for some `k`).

---

## 2. Approach: Concatenate and Compare — O(n) ✅

```
FUNCTION isPrefixString(s, words):
    built = ""
    FOR word IN words:
        built += word
        IF built == s: RETURN true
        IF len(built) > len(s): RETURN false
    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Incrementally build the concatenation. Return true on exact match, false if it exceeds `s` in length.
