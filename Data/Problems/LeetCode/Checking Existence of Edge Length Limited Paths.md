# 1697. Checking Existence of Edge Length Limited Paths

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths)
**Companies:** Google, Uber

---

## 1. Problem Description

An undirected graph of `n` nodes is defined by `edgeList`, where `edgeList[i] = [u_i, v_i, dis_i]` denotes an edge between nodes `u_i` and `v_i` with distance `dis_i`. Note that there may be **multiple** edges between two nodes.

Given an array `queries`, where `queries[j] = [p_j, q_j, limit_j]`, your task is to determine for each `queries[j]` whether there is a path between `p_j` and `q_j` such that each edge on the path has a distance **strictly less than** `limit_j`.

Return *a **boolean array*** `answer`*, where* `answer.length == queries.length` *and the* `j`*-th value of* `answer` *is* `true` *if there is a path for* `queries[j]` *is* `true`*, and* `false` *otherwise*.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= edgeList.length, queries.length <= 10^5`
- `edgeList[i].length == 3`
- `queries[j].length == 3`
- `0 <= u_i, v_i, p_j, q_j <= n - 1`
- `u_i != v_i`
- `p_j != q_j`
- `1 <= dis_i, limit_j <= 10^9`
- There may be **multiple** edges between two nodes.

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

```
Example 1:
  Input: n = 3, edgeList = [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], queries = [[0,1,2],[0,2,5]]
  Output: [false,true]
  Explanation: Note that there are two overlapping edges between 0 and 1 with distances 2 and 16.
  For the first query, between 0 and 1 there is no path where each distance is less than 2, thus we return false for this query.
  For the second query, there is a path (0 -> 1 -> 2) of two edges with distances less than 5, thus we return true for this query.
```

```
Example 2:
  Input: n = 5, edgeList = [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], queries = [[0,4,14],[1,4,13]]
  Output: [true,false]
  Explanation: For limit 14, the whole chain 0-1-2-3-4 is usable. For limit 13, edge (3,4) with distance 13 is not strictly less than 13.
```

---

## 5. Walkthrough

Consider Example 1 with `limit = 5` for query (0,2).
| Step | Action | Union-Find Sets |
|------|--------|-----------------|
| 1 | Sort edges: (0,1,2), (1,2,4). Sort queries: limit 3 then limit 5. | — |
| 2 | Process query limit 3: add edges with weight <3 → edge (0,1,2). Union(0,1). | {0,1}, {2} |
| 3 | Check connectivity 0-2 → different sets → false. |
| 4 | Process query limit 5: add remaining edge (1,2,4). Union(1,2) merges sets → {0,1,2}. |
| 5 | Check connectivity 0-2 → same set → true.

---

## 6. Complexity Analysis

- **Time Complexity:** O((E + Q) log(E + Q)) for sorting, plus near-linear Union-Find operations (α(n) ≈ constant).
- **Space Complexity:** O(n + Q) for Union-Find parent array and answer list.

---

## 7. Follow-Up Questions

- How would you adapt the solution for dynamic edge insertions and deletions?
- Can the approach be extended to directed graphs with weight constraints?
- What changes are needed if the limit comparison is `≤` instead of `<`?

---

## Key Takeaway

> Offline query processing with sorted edges + Union-Find. Add edges incrementally as the limit increases. This avoids running a separate BFS/DFS for each query.
