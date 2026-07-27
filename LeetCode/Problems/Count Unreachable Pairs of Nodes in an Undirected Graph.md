# 2316. Count Unreachable Pairs of Nodes in an Undirected Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph)
**Companies:** Amazon, Google, Microsoft, Snapchat

---

## Problem Description

Count pairs of nodes that are **not** connected in an undirected graph with `n` nodes.

---

## Key Insight

Find connected component sizes. For each component of size `s`, it contributes `s × (total_nodes_seen_before)` unreachable pairs with all previously counted components. Alternatively: total pairs - reachable pairs.

---

## Approach

```
FUNCTION countPairs(n, edges):
    uf = UnionFind(n)
    FOR [u, v] IN edges: uf.union(u, v)

    sizes = Counter(uf.find(i) for i in range(n))
    result = 0; seen = 0
    FOR size IN sizes.values():
        result += size * seen
        seen += size
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + E × α(n)) |
| **Space** | O(n) |

---

## Key Takeaway

> **Unreachable pairs = cross-component pairs. Find component sizes via Union-Find, then for each component multiply its size by the cumulative size of all previous components.**
