# 791. Custom Sort String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/custom-sort-string](https://leetcode.com/problems/custom-sort-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description

Rearrange characters of `s` so they follow the ordering defined by `order`. Characters not in `order` can go anywhere.

---

## Approach

```
FUNCTION customSortString(order, s):
    count = Counter(s)
    result = ""
    FOR c IN order:
        result += c * count.pop(c, 0)
    FOR c, cnt IN count.items():
        result += c * cnt
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = len(s) |
| **Space** | O(n) |

---

## Key Takeaway

> **Custom ordering via counting sort: count character frequencies, output in `order` sequence first, then append remaining characters.**
