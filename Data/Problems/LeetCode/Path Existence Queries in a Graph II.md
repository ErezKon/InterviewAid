# 3534. Path Existence Queries in a Graph II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/path-existence-queries-in-a-graph-ii](https://leetcode.com/problems/path-existence-queries-in-a-graph-ii)
**Companies:** Google

---

## Problem Description
You are given an integer `n` representing the number of nodes in a graph, labeled from 0 to `n - 1`.

You are also given an integer array `nums` of length `n` and an integer `maxDiff`.

An **undirected** edge exists between nodes `i` and `j` if the **absolute** difference between `nums[i]` and `nums[j]` is **at most** `maxDiff` (i.e., `|nums[i] - nums[j]| <= maxDiff`).

You are also given a 2D integer array `queries`. For each `queries[i] = [u_i, v_i]`, find the **minimum** distance between nodes `u_i` and `v_i`. If no path exists between the two nodes, return -1 for that query.

Return an array `answer`, where `answer[i]` is the result of the `i`-th query.

**Note:** The edges between the nodes are unweighted.

**Constraints:**

- `1 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `0 <= maxDiff <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i] == [u_i, v_i]`
- `0 <= u_i, v_i < n`

## Examples

```
Example 1:
  Input: n = 5, nums = [1,8,3,4,2], maxDiff = 3, queries = [[0,3],[2,4]]
  Output: [1,1]
  Explanation: The resulting graph has edges 0-2, 0-3, 0-4, 2-3, 2-4, 3-4 (node 1 is isolated).
  Query  | Shortest Path | Minimum Distance
  [0, 3] | 0 -> 3        | 1
  [2, 4] | 2 -> 4        | 1
  Thus, the output is [1, 1].
```

```
Example 2:
  Input: n = 5, nums = [5,3,1,9,10], maxDiff = 2, queries = [[0,1],[0,2],[2,3],[4,3]]
  Output: [1,2,-1,1]
  Explanation: The resulting graph has edges 0-1, 1-2, 3-4.
  Query  | Shortest Path | Minimum Distance
  [0, 1] | 0 -> 1        | 1
  [0, 2] | 0 -> 1 -> 2   | 2
  [2, 3] | None          | -1
  [4, 3] | 3 -> 4        | 1
  Thus, the output is [1, 2, -1, 1].
```

```
Example 3:
  Input: n = 3, nums = [3,6,1], maxDiff = 1, queries = [[0,0],[0,1],[1,2]]
  Output: [0,-1,-1]
  Explanation: There are no edges between any two nodes because:
    - Nodes 0 and 1: |nums[0] - nums[1]| = |3 - 6| = 3 > 1
    - Nodes 0 and 2: |nums[0] - nums[2]| = |3 - 1| = 2 > 1
    - Nodes 1 and 2: |nums[1] - nums[2]| = |6 - 1| = 5 > 1
  Thus, no node can reach any other node, and the output is [0, -1, -1].
```

## Approach
Process the operations offline using a Union-Find (Disjoint Set Union) with *rollback* or *divide-and-conquer* on time, but a simpler method is to handle queries **after each edge** by performing unions for all edges seen so far and then answering the batch of queries.

```text
FUNCTION pathExistenceQueriesII(n, edges, queryBatches):
    // DSU initialisation
    SET parent ← ARRAY of size n where parent[i] ← i
    SET rank ← ARRAY of size n filled with 0
    SET answers ← empty list

    SET edgeIdx ← 0
    FOR each batch IN queryBatches:
        // add edges up to this batch point
        WHILE edgeIdx < LENGTH(edges) AND edges[edgeIdx].time ≤ batch.time:
            UNION(edges[edgeIdx].u, edges[edgeIdx].v)
            INCREMENT edgeIdx
        ENDFOR
        // answer queries in this batch
        FOR each (u, v) IN batch.queries:
            IF FIND(u) = FIND(v):
                APPEND true TO answers
            ELSE:
                APPEND false TO answers
        ENDFOR
    ENDFOR
    RETURN answers

FUNCTION FIND(x):
    IF parent[x] ≠ x:
        SET parent[x] ← FIND(parent[x])
    RETURN parent[x]

FUNCTION UNION(a, b):
    SET ra ← FIND(a)
    SET rb ← FIND(b)
    IF ra = rb: RETURN
    IF rank[ra] < rank[rb]:
        SET parent[ra] ← rb
    ELSE IF rank[ra] > rank[rb]:
        SET parent[rb] ← ra
    ELSE:
        SET parent[rb] ← ra
        INCREMENT rank[ra]
```

## Walkthrough
For the first example:

| Step | Edge added | DSU parent after union | Queries answered |
|------|------------|------------------------|------------------|
| Init | – | `[0,1,2]` | – |
| Batch 1 (time after first edge) | (0,1) | `[0,0,2]` | `(0,2)` → false |
| Batch 2 (after second edge) | (1,2) → union(0,2) | `[0,0,0]` | `(0,2)` → true, `(1,0)` → true |

## Complexity Analysis
- **Time:** O((m + q) α(n)) where `m` is number of edges, `q` total queries, `α` inverse Ackermann.
- **Space:** O(n) for DSU structures.

## Follow-Up Questions
1. How would you support edge deletions?
2. Can you answer queries online without storing all future edges?
3. What changes are needed for a directed graph?

## Key Takeaway
By incrementally unioning edges and answering batches of queries with a DSU, connectivity can be determined efficiently after each update.
