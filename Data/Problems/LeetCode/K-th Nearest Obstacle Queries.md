# 3275. K-th Nearest Obstacle Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-nearest-obstacle-queries](https://leetcode.com/problems/k-th-nearest-obstacle-queries)
**Companies:** Google

---

## 1. Problem Description

There is an infinite 2D plane.

You are given a positive integer `k`. You are also given a 2D array `queries`, which contains the following queries:

- `queries[i] = [x, y]`: Build an obstacle at coordinate `(x, y)` in the plane. It is guaranteed that there is **no** obstacle at this coordinate when this query is made.

After each query, you need to find the **distance** of the `k^th` **nearest** obstacle from the origin.

Return an integer array `results` where `results[i]` denotes the `k^th` nearest obstacle after query `i`, or `results[i] == -1` if there are less than `k` obstacles.

**Note** that initially there are **no** obstacles anywhere.

The **distance** of an obstacle at coordinate `(x, y)` from the origin is given by `|x| + |y|`.

**Constraints:**
- `1 <= queries.length <= 2 * 10^5`
- All `queries[i]` are unique.
- `-10^9 <= queries[i][0], queries[i][1] <= 10^9`
- `1 <= k <= 10^5`

---

## Examples

**Example 1:**
```
Input: queries = [[1,2],[3,4],[2,3],[-3,0]], k = 2
Output: [-1,7,5,3]
Explanation: - Initially, there are 0 obstacles.
- After queries[0], there are less than 2 obstacles.
- After queries[1], there are obstacles at distances 3 and 7.
- After queries[2], there are obstacles at distances 3, 5, and 7.
- After queries[3], there are obstacles at distances 3, 3, 5, and 7.
```

**Example 2:**
```
Input: queries = [[5,5],[4,4],[3,3]], k = 1
Output: [10,8,6]
Explanation: - After queries[0], there is an obstacle at distance 10.
- After queries[1], there are obstacles at distances 8 and 10.
- After queries[2], there are obstacles at distances 6, 8, and 10.
```

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
