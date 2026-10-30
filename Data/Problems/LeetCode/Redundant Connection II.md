# 685. Redundant Connection II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/redundant-connection-ii](https://leetcode.com/problems/redundant-connection-ii)
**Companies:** Google
---

## Problem Description
In this problem, a rooted tree is a **directed** graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.

The given input is a directed graph that started as a rooted tree with `n` nodes (with distinct values from `1` to `n`), with one additional directed edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed.

The resulting graph is given as a 2D-array of `edges`. Each element of `edges` is a pair `[ui, vi]` that represents a **directed** edge connecting nodes `ui` and `vi`, where `ui` is a parent of child `vi`.

Return *an edge that can be removed so that the resulting graph is a rooted tree of* `n` *nodes*. If there are multiple answers, return the answer that occurs last in the given 2D-array.

**Constraints:**

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ui, vi <= n`
- `ui != vi`

## Examples

```
Example 1:
  Input: edges = [[1,2],[1,3],[2,3]]
  Output: [2,3]
  Explanation: Node 3 has two parents (1 and 2); removing [2,3], the later one, restores a valid rooted tree.
```

```
Example 2:
  Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
  Output: [4,1]
  Explanation: Edges 1->2->3->4->1 form a cycle; removing [4,1] restores a rooted tree with root 1.
```

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
