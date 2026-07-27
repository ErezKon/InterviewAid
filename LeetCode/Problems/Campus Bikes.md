# 1057. Campus Bikes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/campus-bikes](https://leetcode.com/problems/campus-bikes)
**Companies:** Google, Snowflake

---

## 1. Problem Description

Given `n` workers and `m` bikes on a 2D grid, assign each worker a bike minimizing Manhattan distance. If ties, prefer smaller worker index, then smaller bike index. Each bike assigned to at most one worker.

---

## 2. Key Insight

> Generate all (worker, bike) pairs with distances, sort by (distance, worker_idx, bike_idx), then greedily assign unassigned bikes to unassigned workers.

---

## 3. Approach: Sort Pairs + Greedy — O(n·m·log(n·m)) ✅

```
FUNCTION assignBikes(workers, bikes):
    pairs = []
    FOR i, w IN enumerate(workers):
        FOR j, b IN enumerate(bikes):
            pairs.ADD((manhattan(w, b), i, j))
    SORT pairs
    
    result = [-1] * len(workers)
    bikeUsed = set()
    FOR dist, i, j IN pairs:
        IF result[i] == -1 AND j NOT IN bikeUsed:
            result[i] = j
            bikeUsed.ADD(j)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n·m·log(n·m)) | O(n·m) |

---

## Key Takeaway

> Greedy assignment by sorted priority. For optimal (minimum total) assignment, see Campus Bikes II which requires DP with bitmask.
