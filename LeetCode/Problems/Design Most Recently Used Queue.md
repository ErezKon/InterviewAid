# 1756. Design Most Recently Used Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-most-recently-used-queue](https://leetcode.com/problems/design-most-recently-used-queue)
**Companies:** Google, Verizon

---

## Problem Description

Design a queue of `[1..n]`. `fetch(k)` returns the k-th element (1-indexed) and moves it to the end.

---

## Examples

**Example 1:**
```
Input: n = 8, queries = [3,5,2]
Output: [3,5,2]
Explanation:
- Initial queue: [1,2,3,4,5,6,7,8]
- fetch(3) returns 3, queue becomes [1,2,4,5,6,7,8,3]
- fetch(5) returns 5, queue becomes [1,2,4,6,7,8,3,5]
- fetch(2) returns 2, queue becomes [1,4,6,7,8,3,5,2]
```

**Example 2:**
```
Input: n = 5, queries = [1,1,1]
Output: [1,1,1]
Explanation:
- After each fetch(1), the first element is moved to the end, rotating the queue.
```

---

## Key Insight

Naive list operations are O(n). A **Fenwick tree (BIT)** with a virtual array of size `n + numQueries` lets us find the k-th present element in O(log n) and append at the end.

---

## Approach

```text
CLASS MRUQueue:
    CONSTRUCTOR(n):
        // BIT over positions 1..n+queries, mark 1..n as present
        bit = BIT(n + maxQueries)
        FOR i ← 1 TO n:
            bit.update(i, 1)
            values[i] = i
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

## Walkthrough

Consider Example 1 with `n = 8` and the first query `fetch(3)`:
| Step | Operation | BIT state (present count) | Queue representation |
|------|-----------|---------------------------|----------------------|
| 1 | Find 3rd present element using `findKth` | Position 3 is found | Queue: `[1,2,3,4,5,6,7,8]` |
| 2 | Remove element at position 3 (`bit.update(3,-1)`) | Count at 3 becomes 0 | Queue becomes `[1,2,4,5,6,7,8]` |
| 3 | Append value 3 at `nextSlot = 9` (`bit.update(9,1)`) | New position 9 marked present | Queue becomes `[1,2,4,5,6,7,8,3]` |
The same steps repeat for subsequent queries, always locating the k‑th present element, removing it, and appending it at the next free slot.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) per `fetch` |
| **Space** | O(n + queries) |

---

## Follow-Up Questions

1. How would you modify the design to support `pushBack(val)` and `popFront()` operations efficiently?
2. Can the solution be adapted to handle deletions of arbitrary elements, not just the fetched one?
3. What trade‑offs arise if you use a balanced binary search tree instead of a Fenwick tree?

---

## Key Takeaway

> **Fenwick tree with binary lifting finds the k-th present element in O(log n). Appending to a virtual extended array avoids costly list shifts. Simple list works if constraints are small.**