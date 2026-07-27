# 2846. Minimum Edge Weight Equilibrium Queries in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-edge-weight-equilibrium-queries-in-a-tree](https://leetcode.com/problems/minimum-edge-weight-equilibrium-queries-in-a-tree)
**Companies:** Sprinklr

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: LCA + Weight Frequency — O((n + q) log n)](#approach-lca--weight-frequency--on--q-log-n)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a weighted tree with `n` nodes and queries `[u, v]`, for each query return the **minimum number of edge weight changes** on the path `u → v` so that all edges on that path have the same weight.

**Constraints:**
- `1 ≤ n ≤ 10⁴`
- `1 ≤ queries.length ≤ 2 × 10⁴`
- `1 ≤ edge weight ≤ 26`

---

## Examples

**Example 1:**
```
Input: n=7, edges=[[0,1,1],[1,2,1],[2,3,1],[3,4,2],[4,5,2],[5,6,2]], queries=[[0,3],[3,6],[2,5]]
Output: [0, 0, 1]
Explanation: Path 0→3: weights [1,1,1] — already equal, 0 changes.
  Path 3→6: weights [2,2,2] — already equal, 0 changes.
  Path 2→5: weights [1,2,2] — change the 1 to 2, 1 change.
```

---

## Key Insight

> On the path u→v, count the frequency of each weight. The answer = `path_length - max_frequency` (keep the most common weight, change everything else). Use **LCA (Lowest Common Ancestor)** to find the path, and prefix frequency arrays to compute weight counts efficiently.

Since weights are at most 26, store a 26-element frequency vector per node from root.

---

## Approach: LCA + Weight Frequency — O((n + q) log n) ✅

```
FUNCTION minOperationsQueries(n, edges, queries):
    // Build tree, compute:
    //   depth[v], parent table for LCA (binary lifting)
    //   freq[v][w] = count of edges with weight w on path root→v

    FOR each query [u, v]:
        lca ← LCA(u, v)
        pathLen ← depth[u] + depth[v] - 2 * depth[lca]
        // Frequency of weight w on path u→v:
        //   freq[u][w] + freq[v][w] - 2 * freq[lca][w]
        maxFreq ← MAX over w of (freq[u][w] + freq[v][w] - 2 * freq[lca][w])
        answer ← pathLen - maxFreq

    RETURN answers
```

---

## Walkthrough

```
Path 2→5 in the example tree:
Edges: 2-3 (w=1), 3-4 (w=2), 4-5 (w=2)
Weight frequencies: {1:1, 2:2}
pathLen = 3, maxFreq = 2
```

Answer = 3 - 2 = **1** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O((n + q) · log n · 26) — LCA setup + queries with frequency lookup |
| **Space** | O(n · (26 + log n)) — frequency arrays + binary lifting table |

---

## Follow-Up Questions

1. **Why LCA?** The unique path in a tree between u and v goes through their LCA — prefix sums from root let us compute path frequencies via inclusion-exclusion.
2. **Why is weight ≤ 26 important?** It bounds the frequency vector size, making per-query work O(26) = O(1).
3. **What if weights were unbounded?** Use hashmaps instead of arrays for frequencies, but the complexity worsens.

---

## Key Takeaway

> For tree-path queries about edge weights, combine **LCA** with **prefix frequency vectors** — the answer "minimum changes to equalize" = `path_length - max_frequency` on the path.
