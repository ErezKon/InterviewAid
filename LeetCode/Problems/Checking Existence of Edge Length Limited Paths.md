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

```text
FUNCTION distanceLimitedPathsExist(n, edges, queries):
    SORT edges BY weight ASC
    indexedQueries = SORT queries BY limit ASC, keep original index
    uf = UnionFind(n)
    result = ARRAY[ len(queries) ] initialized to false
    ei = 0
    
    FOR (u, v, limit, qIdx) IN indexedQueries:
        WHILE ei < len(edges) AND edges[ei].weight < limit:
            uf.union(edges[ei].u, edges[ei].v)
            ei += 1
        result[qIdx] = uf.connected(u, v)
    
    RETURN result
```

| Time | Space |
|------|-------|
| O((E+Q) log(E+Q) + (E+Q)·α(n)) | O(n + Q) |

---

## 4. Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1,2],[1,2,4]], queries = [[0,2,3],[0,2,5]]
Output: [false,true]
Explanation: For limit 3, only edge (0,1) weight 2 is usable, so 0 and 2 are disconnected. For limit 5, both edges are usable, connecting 0 and 2.
```

**Example 2:**
```
Input: n = 5, edges = [[0,1,1],[1,2,2],[2,3,3],[3,4,4]], queries = [[0,4,4]]
Output: [false]
Explanation: Edge (3,4) weight 4 is not < limit 4, breaking the path.
```

---

## 5. Walkthrough

Consider Example 1 with `limit = 5` for query (0,2).
| Step | Action | Union‑Find Sets |
|------|--------|-----------------|
| 1 | Sort edges: (0,1,2), (1,2,4). Sort queries: limit 3 then limit 5. | — |
| 2 | Process query limit 3: add edges with weight <3 → edge (0,1,2). Union(0,1). | {0,1}, {2} |
| 3 | Check connectivity 0‑2 → different sets → false. |
| 4 | Process query limit 5: add remaining edge (1,2,4). Union(1,2) merges sets → {0,1,2}. |
| 5 | Check connectivity 0‑2 → same set → true.

---

## 6. Complexity Analysis

- **Time Complexity:** O((E + Q) log(E + Q)) for sorting, plus near‑linear Union‑Find operations (α(n) ≈ constant).
- **Space Complexity:** O(n + Q) for Union‑Find parent array and answer list.

---

## 7. Follow-Up Questions

- How would you adapt the solution for dynamic edge insertions and deletions?
- Can the approach be extended to directed graphs with weight constraints?
- What changes are needed if the limit comparison is `≤` instead of `<`?

---

## Key Takeaway

> Offline query processing with sorted edges + Union‑Find. Add edges incrementally as the limit increases. This avoids running a separate BFS/DFS for each query.
