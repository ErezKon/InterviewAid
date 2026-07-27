# 3120. Count the Number of Special Characters I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-special-characters-i](https://leetcode.com/problems/count-the-number-of-special-characters-i)
**Companies:** Amazon, Google

---

## Problem Description

A letter is **special** if it appears in both lowercase and uppercase in `word`. Count special letters (no ordering constraint, unlike version II).

---

## Approach

```
FUNCTION numberOfSpecialChars(word):
    chars = SET(word)
    count = 0
    FOR c IN 'a'..'z':
        IF c IN chars AND c.upper() IN chars: count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(52) = O(1) |

---

## Key Takeaway

> **Build a set of all characters, then check each letter for both cases. Simpler than version II since no ordering constraint.**
