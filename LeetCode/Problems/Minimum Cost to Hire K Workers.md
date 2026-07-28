# 857. Minimum Cost to Hire K Workers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-hire-k-workers](https://leetcode.com/problems/minimum-cost-to-hire-k-workers)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

You are given two integer arrays `quality` and `wage` where `quality[i]` is the quality of the i‑th worker and `wage[i]` is the minimum wage expectation for that worker. To hire a group of workers, you must pay them all the same **hourly wage rate** `r`. A worker with quality `q` will then be paid `r × q`. The rate `r` must be at least `wage[i] / quality[i]` for every hired worker. Choose exactly `k` workers and determine the minimum total wage needed to hire them.

## Examples

1. **Input:** `quality = [10,20,5]`, `wage = [70,50,30]`, `k = 2`
   **Output:** `105.0`
   **Explanation:** Hire workers 0 and 2. Their rate must be at least `max(70/10, 30/5) = 7`. Total cost = `7 × (10+5) = 105`.
2. **Input:** `quality = [3,1,10,10,1]`, `wage = [4,8,2,2,7]`, `k = 3`
   **Output:** `30.666667`
   **Explanation:** Hire workers 0, 2, 3 with rate `3/3 = 1`. Total cost = `1 × (3+10+10) = 23` (optimal rate is higher, yielding the shown minimum).

## Approach

**Algorithm:** Sort workers by their wage‑to‑quality ratio and maintain a max‑heap of the `k` smallest qualities.

1. Compute `ratio = wage[i] / quality[i]` for each worker.
2. Sort workers ascending by `ratio`.
3. Iterate through the sorted list, adding each worker’s quality to a max‑heap and tracking the sum of qualities.
4. When the heap size exceeds `k`, remove the largest quality (pop from max‑heap) to keep only the cheapest `k` qualities.
5. If the heap size equals `k`, the current `ratio` can serve as the wage rate; compute `cost = ratio × sumQualities` and update the minimum.

```text
FUNCTION minCostToHireKWorkers(quality, wage, k):
    workers ← LIST of (ratio, q) where ratio ← wage[i] / quality[i]
    SORT workers BY ratio ASCENDING
    maxHeap ← MAX-HEAP()
    sumQual ← 0
    minCost ← INFINITY

    FOR (ratio, q) IN workers DO
        maxHeap.PUSH(q)
        sumQual ← sumQual + q
        IF maxHeap.SIZE() > k THEN
            sumQual ← sumQual - maxHeap.POP()
        IF maxHeap.SIZE() = k THEN
            cost ← ratio * sumQual
            IF cost < minCost THEN
                minCost ← cost
    RETURN minCost
```

## Walkthrough

Consider `quality = [10,20,5]`, `wage = [70,50,30]`, `k = 2`.

| Step | Worker (ratio, q) | Heap (max‑top) | sumQual | Cost (if size=2) |
|------|-------------------|----------------|---------|-------------------|
| 1    | (3.0, 10)         | [10]           | 10      | – |
| 2    | (2.5, 20)         | [20,10]        | 30      | 2.5 × 30 = 75 |
| 3    | (6.0, 5)          | [20,10,5] → pop 20 → [10,5] | 15 | 6.0 × 15 = 90 |

The minimum observed cost is `105` after processing all workers (using ratio = 7 from worker 0 and 2).

## Complexity Analysis

- **Time:** `O(n log n)` for sorting and heap operations.
- **Space:** `O(n)` for storing workers and the heap.

## Follow‑Up Questions

- How would the solution change if workers could be hired in multiple groups with different rates?
- Can the algorithm be adapted to return the actual set of hired workers?
- What if the wage‑to‑quality ratio is not monotonic due to additional constraints?

## Key Takeaway

Sort by **wage‑to‑quality ratio** and keep the `k` smallest qualities in a max‑heap; the current ratio gives the cheapest feasible rate, yielding a linear‑ith‑log solution.
