# 3547. Maximum Sum of Edge Values in a Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-edge-values-in-a-graph](https://leetcode.com/problems/maximum-sum-of-edge-values-in-a-graph)
**Companies:** Bloomberg

---

## Problem Description

> *Note: the Approach below (general maximum-weight matching) solves an invented problem. Officially the connected graph has max degree 2, so it is a path or a cycle, and you assign the values `1..n` to maximize `Σ a·b` over edges. Correct idea: zigzag arrangement. Place `n` in the middle, then put `n−1, n−2, …` alternately on the right and left ends, and lay this order along the path or cycle. Verified against brute force for n ≤ 8.*

You are given an **undirected connected** graph of `n` nodes, numbered from `0` to `n - 1`. Each node is connected to **at most** 2 other nodes.

The graph consists of `m` edges, represented by a 2D array `edges`, where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i`.

You have to assign a **unique** value from 1` to n` to each node. The value of an edge will be the **product** of the values assigned to the two nodes it connects.

Your score is the sum of the values of all edges in the graph.

Return the **maximum** score you can achieve.

**Constraints:**
- `1 <= n <= 5 * 10^4`
- `m == edges.length`
- `1 <= m <= n`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- There are no repeated edges.
- The graph is connected.
- Each node is connected to at most 2 other nodes.

## Examples

**Example 1:**
```
Input: n = 4, edges = [[0,1],[1,2],[2,3]]
Output: 23
Explanation: The diagram above illustrates an optimal assignment of values to nodes. The sum of the values of the edges is: (1 * 3) + (3 * 4) + (4 * 2) = 23.
```

**Example 2:**
```
Input: n = 6, edges = [[0,3],[4,5],[2,0],[1,3],[2,4],[1,5]]
Output: 82
Explanation: The diagram above illustrates an optimal assignment of values to nodes. The sum of the values of the edges is: (1 * 2) + (2 * 4) + (4 * 6) + (6 * 5) + (5 * 3) + (3 * 1) = 82.
```

## Approach
The problem is the classic **Maximum Weight Matching** in a general graph. For bipartite graphs, the Hungarian algorithm solves it in `O(V³)`. For general graphs, Edmonds' Blossom algorithm finds the maximum weight matching in `O(V³)` (or `O(V·E·log V)` with optimizations). Since the constraints are moderate, we can implement Edmonds' algorithm.
1. Represent the graph with adjacency lists storing neighbor and edge weight.
2. Use the Blossom algorithm to repeatedly find augmenting paths that increase the total weight, contracting odd cycles (blossoms) when necessary.
3. Maintain dual variables (vertex potentials) to ensure optimality of the matching.
The implementation is intricate; the high-level steps are outlined below.

```text
FUNCTION maxWeightMatching(n, edges):
    // Build adjacency matrix weight[u][v] (0 if no edge)
    weight ← MATRIX(n, n, 0)
    FOR each (u, v, w) IN edges:
        weight[u][v] ← w
        weight[v][u] ← w
    // Initialize match array with -1 (unmatched)
    match ← ARRAY(n, -1)
    // Blossom algorithm core loop
    WHILE TRUE:
        // 1. Find augmenting path using BFS on the equality graph
        // 2. If none found, adjust dual variables (increase/decrease potentials)
        // 3. Contract blossoms when odd cycles appear
        // 4. Augment matching along the found path
        IF no augmenting path: BREAK
    total ← 0
    FOR u ← 0 TO n-1:
        IF match[u] > u:
            total ← total + weight[u][match[u]]
    RETURN total
```

## Walkthrough
Consider a triangle graph with vertices `0,1,2` and edges `(0,1,4)`, `(1,2,5)`, `(0,2,3)`.
1. Initially all vertices are unmatched.
2. The algorithm picks the highest-weight edge `(1,2,5)` and matches `1-2`.
3. Vertex `0` remains free; no augmenting path exists because any edge from `0` would connect to a matched vertex, forming an odd cycle. The blossom contraction step would handle this if a better matching existed.
4. Final matching weight = 5, which is optimal.

## Complexity Analysis
*Time*: Edmonds' Blossom algorithm runs in `O(V³)` in the worst case, which is acceptable for `V ≤ 500` as in typical LeetCode limits.
*Space*: `O(V²)` for the weight matrix and additional `O(V + E)` for auxiliary structures.

## Follow-Up Questions
1. How would the solution simplify if the graph is guaranteed to be bipartite?
2. Can you achieve `O(E·√V)` time using a primal-dual approach for bipartite graphs?
3. How would you modify the algorithm to return the actual set of edges in the maximum-weight matching?

## Key Takeaway
Edmonds' Blossom algorithm extends augmenting-path ideas to general graphs, enabling the computation of a maximum-weight matching where edges must not share vertices.
