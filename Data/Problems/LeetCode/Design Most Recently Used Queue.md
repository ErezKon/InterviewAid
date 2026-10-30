# 1756. Design Most Recently Used Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-most-recently-used-queue](https://leetcode.com/problems/design-most-recently-used-queue)
**Companies:** Google, Verizon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Design a queue-like data structure that moves the most recently used element to the end of the queue.

Implement the `MRUQueue` class:

- `MRUQueue(int n)` constructs the `MRUQueue` with `n` elements: `[1,2,3,...,n]`.
- `int fetch(int k)` moves the `k^th` element **(1-indexed)** to the end of the queue and returns it.

**Follow up:** Finding an `O(n)` algorithm per `fetch` is a bit easy. Can you find an algorithm with a better complexity for each `fetch` call?

**Constraints:**
- `1 <= n <= 2000`
- `1 <= k <= n`
- At most `2000` calls will be made to `fetch`.

---

## Examples

**Example 1:**
```
Input: ["MRUQueue", "fetch", "fetch", "fetch", "fetch"]
[[8], [3], [5], [2], [8]]
Output: [null, 3, 6, 2, 2]
Explanation: MRUQueue mRUQueue = new MRUQueue(8); // Initializes the queue to [1,2,3,4,5,6,7,8].
mRUQueue.fetch(3); // Moves the 3^rd element (3) to the end of the queue to become [1,2,4,5,6,7,8,3] and returns it.
mRUQueue.fetch(5); // Moves the 5^th element (6) to the end of the queue to become [1,2,4,5,7,8,3,6] and returns it.
mRUQueue.fetch(2); // Moves the 2^nd element (2) to the end of the queue to become [1,4,5,7,8,3,6,2] and returns it.
mRUQueue.fetch(8); // The 8^th element (2) is already at the end of the queue so just return it.
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