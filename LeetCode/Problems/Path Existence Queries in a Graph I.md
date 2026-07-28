# 3532. Path Existence Queries in a Graph I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-existence-queries-in-a-graph-i](https://leetcode.com/problems/path-existence-queries-in-a-graph-i)
**Companies:** Google

---

## Problem Description
You are given an undirected graph with `n` vertices numbered `0 … n-1` and a list of edges. After the graph is built, you receive a list of queries `[[u₁,v₁],[u₂,v₂],…]`. For each query, determine whether there exists a path connecting `uᵢ` and `vᵢ`. Return a boolean array of answers in the order of the queries.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 3`, `edges = [[0,1],[1,2]]`, `queries = [[0,2],[0,1],[2,0]]` | `[true,true,true]` | All vertices are connected through the chain `0‑1‑2`. |
| `n = 4`, `edges = [[0,1],[2,3]]`, `queries = [[0,2],[1,3],[0,1]]` | `[false,false,true]` | Two separate components `{0,1}` and `{2,3}`. |

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
