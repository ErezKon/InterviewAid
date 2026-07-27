# 900. RLE Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rle-iterator](https://leetcode.com/problems/rle-iterator)
**Companies:** Databricks, Google

---

## Problem Description

Implement an iterator over a run-length encoded sequence. Given encoding `[count₁, val₁, count₂, val₂, ...]`, support `next(n)` which exhausts the next `n` elements and returns the last element exhausted (or `-1` if exhausted).

---

## Approach

```
CLASS RLEIterator:
    INIT(encoding):
        self.encoding ← encoding
        self.index ← 0

    FUNCTION next(n):
        WHILE self.index < LENGTH(self.encoding):
            IF self.encoding[self.index] >= n:
                self.encoding[self.index] -= n
                RETURN self.encoding[self.index + 1]
            n -= self.encoding[self.index]
            self.index += 2
        RETURN -1
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(k) per `next` call amortized — each run consumed at most once across all calls |
| Space  | O(1) extra — modifies encoding in place |

---

## Key Takeaway

> Maintain a pointer into the encoding; on each `next(n)`, consume runs until `n` is satisfied — classic "consume from a stream" iterator pattern.
