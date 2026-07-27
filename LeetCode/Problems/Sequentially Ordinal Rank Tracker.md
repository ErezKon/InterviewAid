# 2102. Sequentially Ordinal Rank Tracker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sequentially-ordinal-rank-tracker](https://leetcode.com/problems/sequentially-ordinal-rank-tracker)
**Companies:** Amazon

---

## Problem Description

Design a system that supports `add(name, score)` and `get()`. The i-th call to `get()` returns the i-th best location (sorted by score desc, then name asc).

---

## Approach: SortedList + Pointer

```
CLASS SORTracker:
    CONSTRUCTOR:
        self.data ← SortedList (by (-score, name))
        self.i ← 0

    FUNCTION add(name, score):
        self.data.ADD((-score, name))

    FUNCTION get():
        result ← self.data[self.i][1]
        self.i += 1
        RETURN result
```

| Operation | Time |
|-----------|------|
| add | O(log n) |
| get | O(log n) |

---

## Key Takeaway

> Maintain a sorted container and a cursor that advances with each `get()` call. SortedList or two heaps (for the boundary element) both work.
