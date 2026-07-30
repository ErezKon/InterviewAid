# 1656. Design an Ordered Stream

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-an-ordered-stream](https://leetcode.com/problems/design-an-ordered-stream)
**Companies:** Bloomberg, Meta, Yandex

---

## Problem Description

Design a stream that receives `(id, value)` pairs out of order and returns consecutive values starting from the current pointer.

---

## Examples

| Input | Output |
|-------|--------|
| `insert(3, "ccccc")` | `[]` |
| `insert(1, "aaaaa")` | `["aaaaa"]` |
| `insert(2, "bbbbb")` | `["bbbbb", "ccccc"]` |

*Explanation*: After inserting id 1, the pointer moves to 1 and returns its value. Inserting id 2 now fills the gap, so ids 2 and 3 are returned together.

---

## Approach

```
FUNCTION buildOrderedStream(n):
    SET stream ← array of size n+1 filled with null
    SET ptr ← 1
    RETURN OBJECT with methods insert and internal state

METHOD insert(idKey, value):
    SET stream[idKey] ← value
    SET result ← []
    WHILE ptr ≤ n AND stream[ptr] IS NOT null:
        APPEND stream[ptr] TO result
        INCREMENT ptr
    RETURN result
```

---

## Walkthrough

**Step‑by‑step for the sequence above:**

| Operation | Stream state (index→value) | ptr | Returned |
|-----------|---------------------------|-----|----------|
| `insert(3, "ccccc")` | 1→null, 2→null, 3→"ccccc" | 1 | `[]` |
| `insert(1, "aaaaa")` | 1→"aaaaa", 2→null, 3→"ccccc" | 1→2 | `["aaaaa"]` |
| `insert(2, "bbbbb")` | 1→"aaaaa", 2→"bbbbb", 3→"ccccc" | 2→4 | `["bbbbb", "ccccc"]` |

The pointer only moves forward, collecting consecutive filled slots.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) amortized total across all inserts |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would you modify the design to support deletion of an id?
2. Can you implement the stream with a balanced BST to allow out‑of‑order retrieval without a pointer?

---

## Key Takeaway

> **Pointer‑based ordered stream:** store values at their ID, advance a pointer through consecutive filled slots on each insert. Amortized O(1) per insert since the pointer only moves forward.
