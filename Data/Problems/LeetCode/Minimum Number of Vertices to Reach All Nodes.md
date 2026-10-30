# 1557. Minimum Number of Vertices to Reach All Nodes

**Difficulty:** 🟡 Medium
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes)
**Companies:** Airbnb, Google, Meta, Microsoft

---

## Problem Description

Given a** directed acyclic graph**, with `n` vertices numbered from `0` to `n-1`, and an array `edges` where `edges[i] = [from_i, to_i]` represents a directed edge from node `from_i` to node `to_i`.

Find *the smallest set of vertices from which all nodes in the graph are reachable*. It's guaranteed that a unique solution exists.

Notice that you can return the vertices in any order.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= edges.length <= min(10^5, n * (n - 1) / 2)`
- `edges[i].length == 2`
- `0 <= from_i, to_i < n`
- All pairs `(from_i, to_i)` are distinct.

## Examples

**Example 1:**
```
Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
Output: [0,3]
Explanation: It's not possible to reach all the nodes from a single vertex. From 0 we can reach [0,1,2,5]. From 3 we can reach [3,4,2,5]. So we output [0,3].
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
Output: [0,2,3]
Explanation: Notice that vertices 0, 3 and 2 are not reachable from any other node, so we must include them. Also any of these vertices can reach nodes 1 and 4.
```

## Approach
A vertex with no incoming edges cannot be reached from any other vertex, therefore it must be included in the answer. The solution is to collect all vertices that never appear as a destination in any edge.

### Pseudocode
```text
FUNCTION findSmallestSetOfVertices(n, edges):
    // Track vertices that have at least one incoming edge
    SET hasIncoming[0..n-1] ← ARRAY OF FALSE
    FOR each edge IN edges:
        SET to ← edge[1]
        SET hasIncoming[to] ← TRUE
    // Vertices without incoming edges form the result set
    SET result ← []
    FOR i ← 0 TO n-1:
        IF NOT hasIncoming[i]:
            APPEND i TO result
    RETURN result
```

## Walkthrough
For the first example, after processing edges we mark vertices `1,2,4,5` as having incoming edges. Vertices `0` and `3` remain unmarked, so the result is `[0,3]`.

## Complexity Analysis
- **Time:** O(V + E) – one pass over edges and one pass over vertices.
- **Space:** O(V) – boolean array to record incoming edges.

## Follow-Up Questions
- How would you modify the algorithm to return the minimum set of vertices for a graph that may contain cycles?
- Can you extend the solution to weighted directed graphs where edges have costs and you need the minimum total cost of starting vertices?
- What if the graph is undirected? How does the problem change?

## Key Takeaway
Vertices with zero indegree are mandatory starting points; collecting them yields the smallest set that can reach the entire directed graph.
