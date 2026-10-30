# 3532. Path Existence Queries in a Graph I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-existence-queries-in-a-graph-i](https://leetcode.com/problems/path-existence-queries-in-a-graph-i)
**Companies:** Google

---

## Problem Description
You are given an integer `n` representing the number of nodes in a graph, labeled from 0 to `n - 1`.

You are also given an integer array `nums` of length `n` sorted in **non-decreasing** order, and an integer `maxDiff`.

An **undirected** edge exists between nodes `i` and `j` if the **absolute** difference between `nums[i]` and `nums[j]` is **at most** `maxDiff` (i.e., `|nums[i] - nums[j]| <= maxDiff`).

You are also given a 2D integer array `queries`. For each `queries[i] = [u_i, v_i]`, determine whether there exists a path between nodes `u_i` and `v_i`.

Return a boolean array `answer`, where `answer[i]` is `true` if there exists a path between `u_i` and `v_i` in the `i`-th query and `false` otherwise.

**Constraints:**

- `1 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `nums` is sorted in **non-decreasing** order.
- `0 <= maxDiff <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i] == [u_i, v_i]`
- `0 <= u_i, v_i < n`

## Examples

```
Example 1:
  Input: n = 2, nums = [1,3], maxDiff = 1, queries = [[0,0],[0,1]]
  Output: [true,false]
  Explanation:
    - Query [0,0]: Node 0 has a trivial path to itself.
    - Query [0,1]: There is no edge between Node 0 and Node 1 because |nums[0] - nums[1]| = |1 - 3| = 2, which is greater than maxDiff.
    - Thus, the final answer after processing all the queries is [true, false].
```

```
Example 2:
  Input: n = 4, nums = [2,5,6,8], maxDiff = 2, queries = [[0,1],[0,2],[1,3],[2,3]]
  Output: [false,false,true,true]
  Explanation: The resulting graph has edges 1-2 and 2-3 (node 0 is isolated).
    - Query [0,1]: There is no edge between Node 0 and Node 1 because |nums[0] - nums[1]| = |2 - 5| = 3, which is greater than maxDiff.
    - Query [0,2]: There is no edge between Node 0 and Node 2 because |nums[0] - nums[2]| = |2 - 6| = 4, which is greater than maxDiff.
    - Query [1,3]: There is a path between Node 1 and Node 3 through Node 2 since |nums[1] - nums[2]| = |5 - 6| = 1 and |nums[2] - nums[3]| = |6 - 8| = 2, both of which are within maxDiff.
    - Query [2,3]: There is an edge between Node 2 and Node 3 because |nums[2] - nums[3]| = |6 - 8| = 2, which is equal to maxDiff.
    - Thus, the final answer after processing all the queries is [false, false, true, true].
```

## Approach
Process the queries offline using a Union‑Find (Disjoint Set Union) data structure:
1. Initialise each vertex as its own set.
2. Iterate over all edges, union the two endpoints.
3. After all unions, each query answer is simply whether `find(u) == find(v)`.
The union‑find operations run in near‑constant amortised time with path compression and union by rank.

```text
FUNCTION pathExistenceQueries(n, edges, queries):
    // initialise DSU
    SET parent ← ARRAY of size n where parent[i] ← i
    SET rank ← ARRAY of size n filled with 0

    // union all edges
    FOR each (u, v) IN edges:
        UNION(u, v)

    // answer queries
    SET answers ← empty list
    FOR each (u, v) IN queries:
        IF FIND(u) = FIND(v):
            APPEND true TO answers
        ELSE:
            APPEND false TO answers
    RETURN answers

FUNCTION FIND(x):
    IF parent[x] ≠ x:
        SET parent[x] ← FIND(parent[x])   // path compression
    RETURN parent[x]

FUNCTION UNION(a, b):
    SET rootA ← FIND(a)
    SET rootB ← FIND(b)
    IF rootA = rootB: RETURN
    // union by rank
    IF rank[rootA] < rank[rootB]:
        SET parent[rootA] ← rootB
    ELSE IF rank[rootA] > rank[rootB]:
        SET parent[rootB] ← rootA
    ELSE:
        SET parent[rootB] ← rootA
        INCREMENT rank[rootA]
```

## Walkthrough
For the first example `n=3`, `edges=[[0,1],[1,2]]`:

| Step | Operation | DSU parent array |
|------|-----------|-------------------|
| Init | each node separate | `[0,1,2]` |
| Union 0‑1 | parent[1] ← 0 | `[0,0,2]` |
| Union 1‑2 | find(1)=0, find(2)=2 → parent[2] ← 0 | `[0,0,0]` |
| Query (0,2) | FIND(0)=0, FIND(2)=0 → true |
| Query (0,1) | both 0 → true |
| Query (2,0) | both 0 → true |

All answers are `true`.

## Complexity Analysis
- **Time:** O(n + m + q α(n)) where `m` is number of edges, `q` number of queries, and `α` is the inverse Ackermann function (practically constant).
- **Space:** O(n) for the `parent` and `rank` arrays.

## Follow‑Up Questions
1. How would you handle dynamic edge additions/removals?
2. Can you answer queries online (as edges arrive) with similar efficiency?
3. What changes are needed if the graph is directed?

## Key Takeaway
Using an offline Union‑Find to merge all edges lets each connectivity query be answered in almost O(1) time.
