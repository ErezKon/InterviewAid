# 281. Zigzag Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zigzag-iterator](https://leetcode.com/problems/zigzag-iterator)
**Companies:** Amazon, C3 Ai, Coinbase, Google, Yandex

---

## Problem Description
Given two vectors `v1` and `v2`, implement an iterator that returns elements alternately from each vector. When one vector is exhausted, continue returning elements from the remaining vector. The iterator must support `next()` to retrieve the next element and `hasNext()` to check if any elements remain.

## Examples
- **Input:** `v1 = [1,2]`, `v2 = [3,4,5,6]`
  **Output:** `[1,3,2,4,5,6]`
  *Explanation:* Alternate until `v1` is exhausted, then append remaining `v2` elements.
- **Input:** `v1 = []`, `v2 = [1,2,3]`
  **Output:** `[1,2,3]`
  *Explanation:* Only `v2` provides elements.

## Approach
Use a queue to store active iterators. Initially push iterators for any non‑empty input vector. For each `next()` call, pop the front iterator, retrieve its current value, and if it has more elements, push it back. `hasNext()` checks if the queue is non‑empty.

```text
FUNCTION ZigzagIterator(v1, v2):
    SET queue ← empty deque
    IF v1 is not empty: queue.APPEND(iterator over v1)
    IF v2 is not empty: queue.APPEND(iterator over v2)

FUNCTION next():
    SET it ← queue.POPLEFT()
    SET val ← it.NEXT()
    IF it has more elements:
        queue.APPEND(it)
    RETURN val

FUNCTION hasNext():
    RETURN queue is not empty
```

## Walkthrough
| Step | Queue (iterators) | Returned Value |
|------|-------------------|----------------|
| Start | `[it(v1), it(v2)]` | – |
| next() | pop `it(v1)` → `1`; push back `it(v1)` | `1` |
| next() | pop `it(v2)` → `3`; push back `it(v2)` | `3` |
| next() | pop `it(v1)` → `2`; `it(v1)` exhausted, not re‑queued | `2` |
| next() | pop `it(v2)` → `4`; push back `it(v2)` | `4` |
| … | continue until queue empty |

## Complexity Analysis
- **Time:** Each `next()` and `hasNext()` operation runs in **O(1)** amortized time.
- **Space:** Stores at most two iterators → **O(1)** extra space.

## Follow‑Up Questions
1. How would you extend this design to `k` vectors?
2. Can you implement the iterator without using extra space for a queue?
3. How would you handle infinite streams where one iterator never ends?

## Key Takeaway
A queue of active iterators enables constant‑time alternating traversal across multiple sequences.
