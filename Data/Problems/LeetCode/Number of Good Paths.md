# 2421. Number of Good Paths

**Difficulty:** 🔴 Hard
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/number-of-good-paths](https://leetcode.com/problems/number-of-good-paths)
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find with Sorted Values — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

There is a tree (i.e. a connected, undirected graph with no cycles) consisting of `n` nodes numbered from `0` to `n - 1` and exactly `n - 1` edges.

You are given a **0-indexed** integer array `vals` of length `n` where `vals[i]` denotes the value of the `i^th` node. You are also given a 2D integer array `edges` where `edges[i] = [a_i, b_i]` denotes that there exists an **undirected** edge connecting nodes `a_i` and `b_i`.

A **good path** is a simple path that satisfies the following conditions:

- The starting node and the ending node have the **same** value.
- All nodes between the starting node and the ending node have values **less than or equal to** the starting node (i.e. the starting node's value should be the maximum value along the path).

Return *the number of distinct good paths*.

Note that a path and its reverse are counted as the **same** path. For example, `0 -> 1` is considered to be the same as `1 -> 0`. A single node is also considered as a valid path.

**Constraints:**
- `n == vals.length`
- `1 <= n <= 3 * 10^4`
- `0 <= vals[i] <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- `edges` represents a valid tree.

---

## 2. Key Insight

> Process nodes in increasing order of their values. When handling a value `v`, union each node of value `v` with its neighbors whose values are `≤ v`. After all unions for `v`, nodes with value `v` that belong to the same connected component form good paths.

---

## 3. Approach: Union-Find with Sorted Values — O(n log n) ✅

```text
FUNCTION numberOfGoodPaths(vals, edges):
    n ← LENGTH(vals)
    // Build adjacency list
    adj ← LIST of n empty lists
    FOR (u, v) IN edges:
        APPEND v TO adj[u]
        APPEND u TO adj[v]

    // Group nodes by value and sort values
    valToNodes ← MAP from value → LIST of node indices
    FOR i FROM 0 TO n-1:
        APPEND i TO valToNodes[vals[i]]
    sortedVals ← SORTED KEYS of valToNodes

    parent ← ARRAY [0..n-1] where parent[i] ← i
    size ← ARRAY of n ones   // optional for union by size
    result ← n   // each node alone is a good path

    FUNCTION find(x):
        WHILE parent[x] ≠ x:
            parent[x] ← parent[parent[x]]
            x ← parent[x]
        RETURN x

    FUNCTION union(a, b):
        ra ← find(a); rb ← find(b)
        IF ra = rb: RETURN
        // union by size
        IF size[ra] < size[rb]: SWAP ra, rb
        parent[rb] ← ra
        size[ra] ← size[ra] + size[rb]

    FOR val IN sortedVals:
        // Union current value nodes with eligible neighbors
        FOR node IN valToNodes[val]:
            FOR nb IN adj[node]:
                IF vals[nb] ≤ val:
                    union(node, nb)
        // Count nodes of this value in each component
        compCount ← MAP from root → integer
        FOR node IN valToNodes[val]:
            root ← find(node)
            compCount[root] ← compCount.get(root, 0) + 1
        FOR cnt IN compCount.values():
            // each pair adds cnt * (cnt-1) / 2 new good paths
            result ← result + cnt * (cnt - 1) / 2
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: vals = [1,3,2,1,3], edges = [[0,1],[0,2],[2,3],[2,4]]
Output: 6
Explanation: There are 5 good paths consisting of a single node.
There is 1 additional good path: 1 -> 0 -> 2 -> 4.
(The reverse path 4 -> 2 -> 0 -> 1 is treated as the same as 1 -> 0 -> 2 -> 4.)
Note that 0 -> 2 -> 3 is not a good path because vals[2] > vals[0].
```

**Example 2:**
```
Input: vals = [1,1,2,2,3], edges = [[0,1],[1,2],[2,3],[2,4]]
Output: 7
Explanation: There are 5 good paths consisting of a single node.
There are 2 additional good paths: 0 -> 1 and 2 -> 3.
```

**Example 3:**
```
Input: vals = [1], edges = []
Output: 1
Explanation: The tree consists of only one node, so there is one good path.
```

---

## Walkthrough

Consider Example 1.
1. **Sort values:** 1 → nodes {0,3}, 2 → {2}, 3 → {1,4}.
2. **Process value 1:**
   - Union node 0 with neighbor 2? No, because `vals[2]=2 > 1`.
   - Union node 3 with neighbor 2? No.
   - Components: {0}, {3}. Each component size 1 → adds `1*(1-1)/2 = 0`.
   - Result so far = 5 (single nodes).
3. **Process value 2:**
   - Node 2 connects to 0 (value 1) and 3 (value 1) → both ≤ 2, so union(2,0) and union(2,3).
   - Component now contains {0,2,3}. No other node of value 2, so no extra pairs.
4. **Process value 3:**
   - Node 1 connects to 0 (≤3) → union(1,0) merges component {0,2,3,1}.
   - Node 4 connects to 2 (≤3) → union(4,2) merges node 4 into same component.
   - Nodes of value 3 are {1,4}. Both share root → `cnt = 2` → add `2*1/2 = 1` good path (1‑4).
   - Additionally, node 1 can pair with node 0 (value 1) via path 1‑0, but endpoints differ, not counted.
   - Result = 5 + 1 (pair 1‑4) + 0 (others) = 6.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) for sorting + near‑linear unions (α(n) amortized) |
| **Space** | O(n) for adjacency, DSU structures |

---

## 5. Key Takeaway

> **Sort‑by‑value + DSU.** By processing nodes from smallest to largest value and union‑finding neighbors that satisfy the value constraint, we can count good paths efficiently without enumerating all pairs.
