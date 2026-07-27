# 857. Minimum Cost to Hire K Workers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-hire-k-workers](https://leetcode.com/problems/minimum-cost-to-hire-k-workers)
**Companies:** Amazon, Google, Microsoft

---

## Key Insight

> Each worker has a rate = `wage[i] / quality[i]`. If we pay at rate `r`, a worker with quality `q` costs `r * q`. Paying at a given rate satisfies all workers with rate ≤ `r`. To minimize cost at rate `r`: pick `k` workers with the **smallest qualities** (minimizes `r * totalQuality`). Use a max-heap to maintain the `k` smallest.

---

## Approach: Sort by Rate + Max-Heap — O(n log n) ✅

```
FUNCTION mincostToHireWorkers(quality, wage, k):
    workers ← SORTED BY wage[i]/quality[i] ASCENDING
    heap ← MaxHeap()
    qualitySum ← 0
    minCost ← INFINITY

    FOR (ratio, q) IN workers DO
        heap.PUSH(q)
        qualitySum ← qualitySum + q

        IF heap.SIZE() > k THEN
            qualitySum ← qualitySum - heap.POP()

        IF heap.SIZE() = k THEN
            minCost ← MIN(minCost, qualitySum * ratio)

    RETURN minCost
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + max-heap | **O(n log n)** | **O(n)** |

---

## Key Takeaway

> **Rate-based greedy** — sort by wage/quality ratio. At each ratio, the cost is `ratio × sum of k smallest qualities`. A max-heap efficiently maintains the k smallest.

---
