# 481. Magical String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/magical-string](https://leetcode.com/problems/magical-string)
**Companies:** Amazon, Google, Microsoft

---

## 1. Problem Description

The magical string `s` is constructed from `{1, 2}` where the group lengths are described by the string itself. Count the number of 1s in the first `n` characters.

---

## 2. Approach: Simulation — O(n) ✅

```
FUNCTION magicalString(n):
    s = [1, 2, 2]
    i = 2
    WHILE len(s) < n:
        next_val = 3 - s[-1]    // toggle between 1 and 2
        s.EXTEND([next_val] * s[i])
        i += 1
    RETURN s[:n].count(1)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Build the string iteratively: pointer `i` tells the group length, toggle the value with `3 - last`. The string is self-describing.
