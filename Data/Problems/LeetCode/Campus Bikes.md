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

```text
FUNCTION assignBikes(workers, bikes):
    pairs ← []
    FOR i ← 0 TO LENGTH(workers)-1:
        FOR j ← 0 TO LENGTH(bikes)-1:
            dist ← ABS(workers[i].x - bikes[j].x) + ABS(workers[i].y - bikes[j].y)
            APPEND (dist, i, j) TO pairs
    SORT pairs BY dist, i, j
    result ← ARRAY OF -1 WITH SIZE LENGTH(workers)
    bikeUsed ← SET()
    FOR (dist, i, j) IN pairs:
        IF result[i] = -1 AND j NOT IN bikeUsed:
            result[i] ← j
            ADD j TO bikeUsed
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
workers = [[0,0],[2,1]]
bikes = [[1,2],[3,3]]
Output: [0,1]
Explanation: Assign bike 0 to worker 0 (distance 3) and bike 1 to worker 1 (distance 3).
```

**Example 2:**
```
workers = [[0,0],[1,1],[2,2]]
bikes = [[1,0],[2,1],[3,2]]
Output: [0,1,2]
```

---

## 5. Walkthrough

Consider Example 1.
| Step | Pairs (dist, worker, bike) | Assigned Bikes |
|------|----------------------------|----------------|
| 1 | (3,0,0), (4,0,1), (3,1,0), (3,1,1) (sorted) | Worker 0 gets bike 0 (first pair) |
| 2 | Next pair (3,1,0) skipped (bike 0 used) |
| 3 | Pair (3,1,1) assigns bike 1 to worker 1 |
Result: [0,1]

---

## 6. Complexity Analysis

- **Time:** Generating all pairs O(n·m), sorting O(n·m·log(n·m)). Overall O(n·m·log(n·m)).
- **Space:** Storing pairs O(n·m) plus result arrays O(n). Overall O(n·m).

---

## 7. Follow-Up Questions

- How would you solve the variant where the total distance is minimized? (Campus Bikes II – requires DP with bitmask.)
- What if workers and bikes are streamed in real‑time?

---

## Key Takeaway

> Greedy assignment by sorted priority. For optimal (minimum total) assignment, see Campus Bikes II which requires DP with bitmask.
