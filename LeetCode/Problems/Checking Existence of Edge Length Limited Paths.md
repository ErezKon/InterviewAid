# 1697. Checking Existence of Edge Length Limited Paths

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths)
**Companies:** Google, Uber

---

## 1. Problem Description

Given a weighted undirected graph and queries `[u, v, limit]`, determine for each query whether there exists a path from `u` to `v` using only edges with weight **strictly less than** `limit`.

---

## 2. Key Insight

> **Offline processing**: sort both edges and queries by weight/limit. Process queries in order of increasing limit, adding edges via Union-Find as they become eligible. Then check connectivity.

---

## 3. Approach: Sort + Union-Find — O((E+Q) log(E+Q)) ✅

```
FUNCTION distanceLimitedPathsExist(n, edges, queries):
    SORT edges by weight
    indexed_queries = sort queries by limit, keeping original indices
    uf = UnionFind(n)
    result = [false] * len(queries)
    ei = 0
    
    FOR (u, v, limit, qi) IN indexed_queries:
        WHILE ei < len(edges) AND edges[ei].weight < limit:
            uf.union(edges[ei].u, edges[ei].v)
            ei += 1
        result[qi] = uf.connected(u, v)
    
    RETURN result
```

| Time | Space |
|------|-------|
| O((E+Q) log(E+Q) + (E+Q)·α(n)) | O(n + Q) |

---

## Key Takeaway

> Offline query processing with sorted edges + Union-Find. Add edges incrementally as the limit increases. This avoids running a separate BFS/DFS for each query.
