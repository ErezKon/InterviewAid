# 2316. Count Unreachable Pairs of Nodes in an Undirected Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph)
**Companies:** Amazon, Google, Microsoft, Snapchat

---

## Problem Description

Count pairs of nodes that are **not** connected in an undirected graph with `n` nodes.

---

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[0,2],[1,2]]
Output: 0
Explanation: All nodes are connected, so there are no unreachable pairs.
```

**Example 2:**
```
Input: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]
Output: 14
Explanation: The graph has two components of sizes 5 and 2. Unreachable pairs = 5 * 2 = 10, plus pairs within each component that are not directly connected but still reachable, resulting in 14 total unreachable pairs.
```

---

## Key Insight

Find connected component sizes. For each component of size `s`, it contributes `s × (total_nodes_seen_before)` unreachable pairs with all previously counted components. Alternatively: total pairs - reachable pairs.

---

## Approach

```
FUNCTION countUnreachablePairs(n, edges):
    SET uf ← UnionFind(n)
    FOR each [u, v] IN edges:
        uf.union(u, v)
    SET componentSizeMap ← MAP()
    FOR i FROM 0 TO n-1:
        SET root ← uf.find(i)
        INCREMENT componentSizeMap[root]
    SET result ← 0
    SET seen ← 0
    FOR each size IN componentSizeMap.values():
        SET result ← result + size * seen
        SET seen ← seen + size
    RETURN result
```

---

## Walkthrough

Consider **Example 2** (`n = 7`, edges as above).

1. Union operations merge nodes into two components: `{0,2,4,5}` (size 4) and `{1,6}` (size 2) and node `3` remains isolated (size 1).
2. Component sizes list: `[4,2,1]`.
3. Iterate sizes:
   - First size 4: `result = 0`, `seen = 4`.
   - Second size 2: `result += 2 * 4 = 8`, `seen = 6`.
   - Third size 1: `result += 1 * 6 = 6`, `seen = 7`.
4. Final `result = 14` unreachable pairs.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + E × α(n)) |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would you modify the solution to return the list of all unreachable pairs instead of just the count?
2. Can the algorithm be adapted for a directed graph where reachability is not symmetric?
3. How would you handle dynamic edge additions/removals efficiently?

---

## Key Takeaway

> **Unreachable pairs = cross-component pairs. Find component sizes via Union-Find, then for each component multiply its size by the cumulative size of all previous components.**