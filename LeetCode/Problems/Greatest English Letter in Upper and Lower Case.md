# 2309. Greatest English Letter in Upper and Lower Case

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case](https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case)
**Companies:** Microsoft

---

## 1. Problem Description

Find the greatest (alphabetically last) letter that appears in both uppercase and lowercase in the string.

## 2. Approach: Set Check — O(n) ✅

```
FUNCTION greatestLetter(s):
    chars = SET(s)
    FOR c IN reversed('ABCDEFGHIJKLMNOPQRSTUVWXYZ'):
        IF c IN chars AND c.lower() IN chars:
            RETURN c
    RETURN ""
```

## Key Takeaway

> Build a set, iterate from 'Z' down to 'A', check if both cases exist.
