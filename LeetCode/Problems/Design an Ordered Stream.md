# 1656. Design an Ordered Stream

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-an-ordered-stream](https://leetcode.com/problems/design-an-ordered-stream)
**Companies:** Bloomberg, Meta, Yandex

---

## Problem Description

Design a stream that receives `(id, value)` pairs out of order and returns consecutive values starting from the current pointer.

---

## Approach

```
CLASS OrderedStream:
    CONSTRUCTOR(n): self.stream = [null] * (n + 1); self.ptr = 1

    FUNCTION insert(idKey, value):
        stream[idKey] = value
        result = []
        WHILE ptr < len(stream) AND stream[ptr]:
            result.ADD(stream[ptr]); ptr += 1
        RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) amortized total across all inserts |
| **Space** | O(n) |

---

## Key Takeaway

> **Pointer-based ordered stream: store values at their ID, advance a pointer through consecutive filled slots on each insert. Amortized O(1) per insert since the pointer only moves forward.**
