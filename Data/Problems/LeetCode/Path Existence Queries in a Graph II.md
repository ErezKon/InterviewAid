# 3534. Path Existence Queries in a Graph II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/path-existence-queries-in-a-graph-ii](https://leetcode.com/problems/path-existence-queries-in-a-graph-ii)
**Companies:** Google

---

## Problem Description
You are given an undirected graph with `n` vertices and a list of edges that are added one by one. After each edge addition you receive a batch of queries `[[u₁,v₁],…]`. For each query, determine whether there exists a path connecting `uᵢ` and `vᵢ` **at that moment**. Return the answers for all queries in order.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 3`, `edges = [[0,1],[1,2]]`, queries after first edge `[[0,2]]`, after second edge `[[0,2],[1,0]]` | `[false,true,true]` | After adding `[0,1]` nodes 0 and 2 are disconnected. After adding `[1,2]` all become connected. |
| `n = 4`, `edges = [[0,1],[2,3]]`, queries after each edge `[[0,3],[1,2]]` | `[false,false]` | Two separate components never connect.

## Approach
Process the operations offline using a Union‑Find (Disjoint Set Union) with *rollback* or *divide‑and‑conquer* on time, but a simpler method is to handle queries **after each edge** by performing unions for all edges seen so far and then answering the batch of queries.

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
| Batch 1 (time after first edge) | (0,1) | `[0,0,2]` | `(0,2)` → false |
| Batch 2 (after second edge) | (1,2) → union(0,2) | `[0,0,0]` | `(0,2)` → true, `(1,0)` → true |

## Complexity Analysis
- **Time:** O((m + q) α(n)) where `m` is number of edges, `q` total queries, `α` inverse Ackermann.
- **Space:** O(n) for DSU structures.

## Follow‑Up Questions
1. How would you support edge deletions?
2. Can you answer queries online without storing all future edges?
3. What changes are needed for a directed graph?

## Key Takeaway
By incrementally unioning edges and answering batches of queries with a DSU, connectivity can be determined efficiently after each update.
