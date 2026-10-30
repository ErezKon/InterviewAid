# 3108. Minimum Cost Walk in Weighted Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph](https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph)
**Companies:** Amazon, De Shaw, Google, Meta, Microsoft, Turing

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Union-Find + AND of All Edges — O(n + E)](#approach-union-find--and-of-all-edges--on--e)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is an undirected weighted graph with `n` vertices labeled from `0` to `n - 1`.

You are given the integer `n` and an array `edges`, where `edges[i] = [ui, vi, wi]` indicates that there is an edge between vertices `ui` and `vi` with a weight of `wi`.

A walk on a graph is a sequence of vertices and edges. The walk starts and ends with a vertex, and each edge connects the vertex that comes before it and the vertex that comes after it. It's important to note that a walk may visit the same edge or vertex more than once.

The **cost** of a walk starting at node `u` and ending at node `v` is defined as the bitwise `AND` of the weights of the edges traversed during the walk. In other words, if the sequence of edge weights encountered during the walk is `w0, w1, w2, ..., wk`, then the cost is calculated as `w0 & w1 & w2 & ... & wk`, where `&` denotes the bitwise `AND` operator.

You are also given a 2D array `query`, where `query[i] = [si, ti]`. For each query, you need to find the minimum cost of the walk starting at vertex `si` and ending at vertex `ti`. If there exists no such walk, the answer is `-1`.

Return *the array* `answer`*, where* `answer[i]` *denotes the **minimum** cost of a walk for query* `i`.

**Constraints:**
- `2 ≤ n ≤ 10⁵`
- `0 ≤ edges.length ≤ 10⁵`
- `edges[i].length == 3`
- `0 ≤ ui, vi ≤ n - 1`
- `ui != vi`
- `0 ≤ wi ≤ 10⁵`
- `1 ≤ query.length ≤ 10⁵`
- `query[i].length == 2`
- `0 ≤ si, ti ≤ n - 1`
- `si != ti`

---

## Examples

```
Example 1:
  Input: n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]
  Output: [1,-1]
  Explanation: To achieve the cost of 1 in the first query, we need to move on the following edges: 0->1 (weight 7), 1->2 (weight 1), 2->1 (weight 1), 1->3 (weight 7).
  In the second query, there is no walk between nodes 3 and 4, so the answer is -1.
```

```
Example 2:
  Input: n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]
  Output: [0]
  Explanation: To achieve the cost of 0 in the first query, we need to move on the following edges: 1->2 (weight 1), 2->1 (weight 6), 1->2 (weight 1).
```

---

## Key Insight

> Since we can revisit edges freely, the cost of the optimal walk between two nodes in the same component is the **AND of ALL edge weights in that component**. AND only decreases as you include more edges, so including every edge in the component minimizes the result.

This means: find connected components, compute the AND of all edges in each component, answer queries by component membership.

---

## Approach: Union-Find + AND of All Edges — O(n + E) ✅

```
FUNCTION minimumCost(n, edges, query):
    uf = UnionFind(n)
    // AND of all edge weights in each component
    componentAnd = [ALL_BITS] * n

    FOR [u, v, w] IN edges:
        ru, rv = uf.find(u), uf.find(v)
        uf.union(u, v)
        root = uf.find(u)
        componentAnd[root] = componentAnd[ru] & componentAnd[rv] & w

    result = []
    FOR [s, t] IN query:
        IF s == t: result.ADD(0)
        ELSE IF uf.find(s) != uf.find(t): result.ADD(-1)
        ELSE: result.ADD(componentAnd[uf.find(s)])

    RETURN result
```

---

## Walkthrough

```
n=5, edges=[[0,1,7],[1,3,7],[1,2,1]]
```

| Edge | Action | Component AND |
|------|--------|---------------|
| (0,1,7) | Union 0,1 | AND = 7 |
| (1,3,7) | Union {0,1},3 | AND = 7 & 7 = 7 |
| (1,2,1) | Union {0,1,3},2 | AND = 7 & 1 = 1 |

**Query [0,3]:** Same component → AND = **1** ✅
**Query [3,4]:** Different components → **-1** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + E + Q · α(n)) — Union-Find with path compression |
| **Space** | O(n) — parent + AND arrays |

---

## Follow-Up Questions

1. **Why does AND only decrease?** Each additional AND operation can only turn bits off, never on. Including more edges can only reduce the result.
2. **What if the operation were OR instead?** Then we'd want to OR all edges in the component — similar approach, but OR only increases.
3. **What if walks couldn't revisit edges?** Then it becomes a much harder NP-hard problem (min-weight Hamiltonian path variant).
4. **Why Union-Find instead of BFS/DFS?** Both work for finding components, but Union-Find elegantly maintains the running AND during construction.

---

## Key Takeaway

> When walks can revisit edges and cost is a bitwise AND, the answer is simply the AND of all edges in the connected component — use **Union-Find** to find components and maintain running AND values.
