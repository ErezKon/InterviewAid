# 3794. Reverse String Prefix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-string-prefix](https://leetcode.com/problems/reverse-string-prefix)
**Companies:** Amazon

---

## Problem Description

Given a string `s` and an integer `k`, reverse the first `k` characters of `s`. If `k` exceeds the length, reverse the entire string.

---

## Approach

```
FUNCTION reversePrefix(s, k):
    RETURN s[:k][::-1] + s[k:]
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Simple slice-and-reverse — take the first `k` characters, reverse them, concatenate with the rest.
