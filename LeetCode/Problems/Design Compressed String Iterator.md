# 604. Design Compressed String Iterator

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-compressed-string-iterator](https://leetcode.com/problems/design-compressed-string-iterator)
**Companies:** Google

---

## Problem Description

Design an iterator for a run-length encoded string like `"L1e2t1C1o1d1e1"`. `next()` returns the next character, `hasNext()` checks if more characters exist.

---

## Approach

```
CLASS StringIterator:
    CONSTRUCTOR(compressedString):
        Parse into list of (char, count) pairs
        idx = 0; remaining = pairs[0].count

    FUNCTION next():
        IF NOT hasNext(): RETURN ' '
        ch = pairs[idx].char
        remaining -= 1
        IF remaining == 0:
            idx += 1
            IF idx < len(pairs): remaining = pairs[idx].count
        RETURN ch

    FUNCTION hasNext():
        RETURN idx < len(pairs)
```

---

## Key Takeaway

> **Parse compressed string into (char, count) pairs. Track current pair index and remaining count. Decrement on `next()`, advance pair when exhausted.**
