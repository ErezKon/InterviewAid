# 1684. Count the Number of Consistent Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-consistent-strings](https://leetcode.com/problems/count-the-number-of-consistent-strings)
**Companies:** Bloomberg, Google, Robinhood

---

## Problem Description

A string is **consistent** if every character in it appears in the `allowed` string. Count consistent strings in `words`.

---

## Approach

```
FUNCTION countConsistentStrings(allowed, words):
    s = SET(allowed)
    RETURN SUM(1 for w in words if all(c in s for c in w))
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m) where n = words count, m = avg word length |
| **Space** | O(26) = O(1) for the allowed set |

---

## Key Takeaway

> **Convert the allowed string to a set for O(1) character lookups, then check each word's characters against it.**
