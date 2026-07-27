# 1756. Design Most Recently Used Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-most-recently-used-queue](https://leetcode.com/problems/design-most-recently-used-queue)
**Companies:** Google, Verizon

---

## Problem Description

Design a queue of `[1..n]`. `fetch(k)` returns the k-th element (1-indexed) and moves it to the end.

---

## Key Insight

Naive list operations are O(n). A **Fenwick tree (BIT)** with a virtual array of size `n + numQueries` lets us find the k-th present element in O(log n) and append at the end.

---

## Approach

```
CLASS MRUQueue:
    CONSTRUCTOR(n):
        // BIT over positions 1..n+queries, mark 1..n as present
        bit = BIT(n + maxQueries)
        FOR i ← 1 TO n: bit.update(i, 1); values[i] = i
        nextSlot = n + 1

    FUNCTION fetch(k):
        pos = bit.findKth(k)        // binary lifting on BIT
        val = values[pos]
        bit.update(pos, -1)          // remove from old position
        values[nextSlot] = val
        bit.update(nextSlot, 1)      // append at end
        nextSlot += 1
        RETURN val
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) per fetch |
| **Space** | O(n + queries) |

---

## Key Takeaway

> **Fenwick tree with binary lifting finds the k-th present element in O(log n). Appending to a virtual extended array avoids costly list shifts. Simple list works if constraints are small.**
