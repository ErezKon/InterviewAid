# 3275. K-th Nearest Obstacle Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-nearest-obstacle-queries](https://leetcode.com/problems/k-th-nearest-obstacle-queries)
**Companies:** Google

---

## 1. Problem Description

Obstacles are placed one by one at given coordinates. After each placement, return the Manhattan distance of the **k‑th nearest obstacle** to the origin. Return -1 if fewer than k obstacles have been placed so far.

---

## Examples

| Queries (x, y) | k | Output |
|----------------|---|--------|
| `[(1,2), (3,0), (0,4)]` | 2 | `5` |
| `[(2,2), (1,1)]` | 3 | `-1` |

*Explanation*: After first three placements, distances are `[3,3,4]`. The 2‑nd nearest is `3`. After two placements, only two obstacles exist, so return -1 for k=3.

---

## 2. Approach: Max‑Heap of Size k — O(n log k) ✅

```text
FUNCTION kthNearestObstacles(queries, k):
    heap ← MaxHeap()   // stores distances, size ≤ k
    result ← []
    FOR each (x, y) IN queries:
        dist ← ABS(x) + ABS(y)
        heap.PUSH(dist)
        IF heap.SIZE() > k:
            heap.POP()   // remove farthest
        IF heap.SIZE() < k:
            result.APPEND(-1)
        ELSE:
            result.APPEND(heap.TOP())
    RETURN result
```

---

## Walkthrough

Consider `queries = [(1,2), (3,0), (0,4)]` with `k = 2`.

| Step | Inserted Point | dist | Heap Contents (max at top) | Output |
|------|----------------|------|----------------------------|--------|
| 1 | (1,2) | 3 | [3] | -1 (size<2) |
| 2 | (3,0) | 3 | [3,3] | 3 (heap top) |
| 3 | (0,4) | 4 | [4,3] → pop 4 → [3,3] | 3 |

The heap always keeps the two closest distances; its top is the 2‑nd nearest.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n log k) | Each insertion into max‑heap of size ≤ k |
| Space | O(k) | Heap stores at most k distances |

---

## Follow‑Up Questions

1. How would you adapt the solution for **Euclidean** distance?
2. Can you support **deletions** of obstacles efficiently?
3. What if queries were offline – could you answer all in O(n log n) using sorting?

---

## Key Takeaway

> Classic streaming top‑k problem: maintain a max‑heap of size k to keep the k closest obstacles; the heap root is the k‑th nearest distance.
