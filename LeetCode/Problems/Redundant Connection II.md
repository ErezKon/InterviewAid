# 685. Redundant Connection II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/redundant-connection-ii](https://leetcode.com/problems/redundant-connection-ii)
**Companies:** Google
---

## Problem Description
In a directed graph of `n` nodes labeled from `1` to `n`, you are given a list of `edges` where each edge is a pair `[u, v]` indicating a directed edge from node `u` to node `v`. The graph started as a rooted tree (a directed tree with exactly one node having no incoming edges) but one extra edge was added, causing either a node to have two parents, a cycle, or both. Return the edge that can be removed to restore the graph to a rooted tree. If multiple answers exist, return the edge that occurs last in the input list.

## Examples
- **Example 1:** `edges = [[1,2],[1,3],[2,3]]` → `[[2,3]]`. Node `3` has two parents; removing `[2,3]` restores a valid tree.
- **Example 2:** `edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]` → `[[4,1]]`. The graph contains a cycle; removing the last edge in the cycle fixes it.

## Approach
Use Union‑Find (Disjoint Set Union) while tracking nodes with two parents.
1. First pass: detect any node with two incoming edges; store both candidate edges.
2. Second pass: perform Union‑Find on all edges except the second candidate (if a two‑parent case exists). If a union creates a cycle, the problematic edge is either the first candidate (if no cycle) or the second candidate (if cycle occurs).

```text
FUNCTION FindRedundantDirectedConnection(edges):
    SET n ← number of nodes
    CREATE array parent[1..n] ← 0
    SET candidate1 ← null; SET candidate2 ← null
    // Step 1: find a node with two parents
    FOR each (u, v) IN edges:
        IF parent[v] = 0:
            SET parent[v] ← u
        ELSE:
            // v has two parents
            SET candidate1 ← [parent[v], v]   // first edge
            SET candidate2 ← [u, v]           // second edge (to possibly remove)
            // Temporarily ignore second edge
            BREAK
    // Initialize Union‑Find
    CREATE DSU with n elements
    FOR each (u, v) IN edges:
        IF (u, v) = candidate2:          // skip second candidate if exists
            CONTINUE
        IF DSU.FIND(u) = DSU.FIND(v):
            // Cycle detected
            IF candidate1 IS null:
                RETURN [u, v]            // no two‑parent case, this edge creates cycle
            ELSE:
                RETURN candidate1        // two‑parent case, first edge creates cycle
        DSU.UNION(u, v)
    // If we reach here, no cycle was found after skipping candidate2
    RETURN candidate2
```

## Walkthrough
Consider `edges = [[1,2],[2,3],[3,1],[4,1]]`.
1. No node has two parents → `candidate1`/`candidate2` remain null.
2. Process edges:
   - Union 1‑2, 2‑3 succeed.
   - Edge 3‑1 finds both nodes already connected → cycle → return `[3,1]`.

If a node had two parents, we would first skip the second incoming edge and test for a cycle to decide which edge to remove.

## Complexity Analysis
- **Time:** `O(n α(n))` ≈ `O(n)` where `α` is the inverse Ackermann function, due to Union‑Find operations.
- **Space:** `O(n)` for parent tracking and Union‑Find structures.

## Follow-Up Questions
1. How would the solution change if the graph could contain multiple extra edges?
2. Can you adapt the algorithm to return the list of edges that need removal for a general directed graph to become a rooted forest?
3. What is the impact on complexity if the graph is extremely large and must be processed in a streaming fashion?

## Key Takeaway
Detecting a node with two parents and using Union‑Find to identify cycles lets you pinpoint the single redundant edge that restores a rooted tree structure.
