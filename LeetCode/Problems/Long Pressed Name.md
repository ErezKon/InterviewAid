# 925. Long Pressed Name

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/long-pressed-name](https://leetcode.com/problems/long-pressed-name)
**Companies:** Bloomberg, Google, Linkedin, Meta, Microsoft, Zoho

---

## 1. Problem Description

Check if `typed` could be the result of long-pressing characters in `name`.

---

## 2. Approach: Two Pointers — O(n) ✅

```
FUNCTION isLongPressedName(name, typed):
    i = j = 0
    WHILE j < len(typed):
        IF i < len(name) AND name[i] == typed[j]:
            i += 1; j += 1
        ELSE IF j > 0 AND typed[j] == typed[j - 1]:
            j += 1
        ELSE:
            RETURN false
    RETURN i == len(name)
```

| Time | Space |
|------|-------|
| O(n + m) | O(1) |

---

## 3. Key Takeaway

> Two pointers: match characters when possible, skip repeated characters in `typed` (long presses). If neither applies, return false.
