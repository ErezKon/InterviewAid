# 1057. Campus Bikes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/campus-bikes](https://leetcode.com/problems/campus-bikes)
**Companies:** Google, Snowflake

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

On a campus represented on the X-Y plane, there are `n` workers and `m` bikes, with `n <= m`.

You are given an array `workers` of length `n` where `workers[i] = [x_i, y_i]` is the position of the `i^th` worker. You are also given an array `bikes` of length `m` where `bikes[j] = [x_j, y_j]` is the position of the `j^th` bike. All the given positions are **unique**.

Assign a bike to each worker. Among the available bikes and workers, we choose the `(worker_i, bike_j)` pair with the shortest **Manhattan distance** between each other and assign the bike to that worker.

If there are multiple `(worker_i, bike_j)` pairs with the same shortest **Manhattan distance**, we choose the pair with **the smallest worker index**. If there are multiple ways to do that, we choose the pair with **the smallest bike index**. Repeat this process until there are no available workers.

Return *an array *`answer`* of length *`n`*, where *`answer[i]`* is the index (**0-indexed**) of the bike that the *`i^th`* worker is assigned to*.

The **Manhattan distance** between two points `p1` and `p2` is `Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|`.

**Constraints:**
- `n == workers.length`
- `m == bikes.length`
- `1 <= n <= m <= 1000`
- `workers[i].length == bikes[j].length == 2`
- `0 <= x_i, y_i < 1000`
- `0 <= x_j, y_j < 1000`
- All worker and bike locations are **unique**.

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
Input: workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]
Output: [1,0]
Explanation: Worker 1 grabs Bike 0 as they are closest (without ties), and Worker 0 is assigned Bike 1. So the output is [1, 0].
```

**Example 2:**
```
Input: workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]
Output: [0,2,1]
Explanation: Worker 0 grabs Bike 0 at first. Worker 1 and Worker 2 share the same distance to Bike 2, thus Worker 1 is assigned to Bike 2, and Worker 2 will take Bike 1. So the output is [0,2,1].
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
- What if workers and bikes are streamed in real-time?

---

## Key Takeaway

> Greedy assignment by sorted priority. For optimal (minimum total) assignment, see Campus Bikes II which requires DP with bitmask.
