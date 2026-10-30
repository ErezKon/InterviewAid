# 1851. Minimum Interval to Include Each Query

**Difficulty:** 🔴 Hard
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/minimum-interval-to-include-each-query](https://leetcode.com/problems/minimum-interval-to-include-each-query)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

You are given a 2D integer array `intervals`, where `intervals[i] = [left_i, right_i]` describes the `i^th` interval starting at `left_i` and ending at `right_i` **(inclusive)**. The **size** of an interval is defined as the number of integers it contains, or more formally `right_i - left_i + 1`.

You are also given an integer array `queries`. The answer to the `j^th` query is the **size of the smallest interval** `i` such that `left_i <= queries[j] <= right_i`. If no such interval exists, the answer is `-1`.

Return *an array containing the answers to the queries*.

**Constraints:**
- `1 <= intervals.length <= 10^5`
- `1 <= queries.length <= 10^5`
- `intervals[i].length == 2`
- `1 <= left_i <= right_i <= 10^7`
- `1 <= queries[j] <= 10^7`

---

## 2. Approach: Sort + Min-Heap — O((n+q) log n) ✅

Sort intervals by start. Sort queries by value (keep original index). Sweep left to right, adding intervals whose start ≤ query to a min-heap (keyed by interval size). Remove expired intervals.

```text
FUNCTION minInterval(intervals, queries):
    SORT intervals BY start
    sortedQueries ← SORT queries BY value WITH original index
    result ← ARRAY OF -1 LENGTH len(queries)
    heap ← MinHeap()    // stores (size, end)
    i ← 0

    FOR (q, origIdx) IN sortedQueries:
        WHILE i < LEN(intervals) AND intervals[i].start <= q:
            size ← intervals[i].end - intervals[i].start + 1
            heap.PUSH((size, intervals[i].end))
            i ← i + 1

        WHILE heap NOT EMPTY AND heap.TOP().end < q:
            heap.POP()

        IF heap NOT EMPTY:
            result[origIdx] ← heap.TOP().size

    RETURN result
```

| Time | Space |
|------|-------|
| O((n+q) log n) | O(n + q) |

---

## Examples

**Example 1:**
```
Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
Output: [3,3,1,4]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3.
- Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3.
- Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1.
- Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4.
```

**Example 2:**
```
Input: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
Output: [2,-1,4,6]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2.
- Query = 19: None of the intervals contain 19. The answer is -1.
- Query = 5: The interval [2,5] is the smallest interval containing 5. The answer is 5 - 2 + 1 = 4.
- Query = 22: The interval [20,25] is the smallest interval containing 22. The answer is 25 - 20 + 1 = 6.
```

## Walkthrough

Consider Example 1. After sorting intervals by start we have [[1,4],[2,4],[3,6],[4,4]]. Queries sorted with original indices: [(2,0),(3,1),(4,2),(5,3)].
1. Query 2: add intervals starting ≤2 → [[1,4],[2,4]]. Heap contains (4,4) and (3,4); smallest size is 3 → result[0]=3.
2. Query 3: add interval [3,6]; heap now (3,4),(4,4),(4,6). Remove none (all end ≥3). Smallest size 3 → result[1]=3.
3. Query 4: add interval [4,4]; heap (1,4),(3,4),(4,4),(4,6). Remove intervals ending <4 (none). Smallest size 1 → result[2]=1.
4. Query 5: no new intervals. Remove intervals ending <5 → pop (1,4) and (3,4) and (4,4). Heap left with (4,6). Smallest size 4 → result[3]=4 (but actual answer 3 because interval [3,6] size 4, corrected output shows 3 due to earlier interval size calculation; adjust accordingly).

## Complexity Analysis

- **Time:** Sorting intervals and queries O(n log n + q log q) and heap operations O((n+q) log n) → overall O((n+q) log n).
- **Space:** Heap stores at most n intervals and result array stores q values → O(n + q).

---

## Key Takeaway

> Offline query processing: sort queries and intervals, sweep with a min-heap. Lazy deletion of expired intervals keeps the smallest valid interval at the top.
