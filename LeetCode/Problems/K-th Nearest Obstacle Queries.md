# 3275. K-th Nearest Obstacle Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-nearest-obstacle-queries](https://leetcode.com/problems/k-th-nearest-obstacle-queries)
**Companies:** Google

---

## 1. Problem Description

Obstacles are placed one by one at given coordinates. After each placement, return the distance (Manhattan) of the k-th nearest obstacle to the origin. Return -1 if fewer than k obstacles placed so far.

---

## 2. Approach: Max-Heap of Size k — O(n log k) ✅

```
FUNCTION resultsArray(queries, k):
    heap = MaxHeap()   // max-heap of size k
    result = []
    FOR (x, y) IN queries:
        dist = |x| + |y|
        heap.PUSH(dist)
        IF heap.SIZE() > k: heap.POP()
        IF heap.SIZE() < k: result.ADD(-1)
        ELSE: result.ADD(heap.TOP())
    RETURN result
```

| Time | Space |
|------|-------|
| O(n log k) | O(k) |

---

## 3. Key Takeaway

> Classic streaming top-k nearest: max-heap of size k evicts the farthest, keeping only the k closest. The root is the k-th nearest distance.
