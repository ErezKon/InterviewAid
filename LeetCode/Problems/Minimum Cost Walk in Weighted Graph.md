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

Given a weighted undirected graph with `n` nodes, a **walk** is a sequence of edges (can revisit nodes/edges). The **cost** of a walk is the bitwise AND of all edge weights along the path. For each query `[s, t]`, find the **minimum cost** walk from `s` to `t`. Return `-1` if no path exists.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `0 ≤ edges.length ≤ 10⁵`
- `0 ≤ w ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: n=5, edges=[[0,1,7],[1,3,7],[1,2,1]], query=[[0,3],[3,4]]
Output: [1, -1]
Explanation: Walk 0→1→2→1→3: AND(7,1,1,7) = 1. Nodes 3 and 4 are disconnected → -1.
```

**Example 2:**
```
Input: n=3, edges=[[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query=[[1,2]]
Output: [0]
Explanation: Walk through all edges: AND(15,6,1,7) = 0.
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
