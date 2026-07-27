# 1957. Delete Characters to Make Fancy String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-characters-to-make-fancy-string](https://leetcode.com/problems/delete-characters-to-make-fancy-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Wayfair

---

## Problem Description

Remove minimum characters so no three consecutive characters are the same.

---

## Approach

```
FUNCTION makeFancyString(s):
    result = []
    FOR c IN s:
        IF len(result) >= 2 AND result[-1] == c AND result[-2] == c:
            CONTINUE
        result.ADD(c)
    RETURN JOIN(result)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Greedy character filtering: only append if it wouldn't create three consecutive identical characters. Check last two characters in the result.**
