# 1579. Remove Max Number of Edges to Keep Graph Fully Traversable

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable)
**Companies:** De Shaw, Google, Meta, Uber

---

## Problem Description
Alice and Bob each have an undirected graph with `n` nodes labeled `1..n`. The graph contains three types of edges:
- Type 1: usable only by Alice
- Type 2: usable only by Bob
- Type 3: usable by both
You may remove any edges. Return the maximum number of edges you can remove while still ensuring that both Alice's and Bob's graphs are fully traversable (i.e., each can reach all `n` nodes). If it is impossible, return `-1`.

## Examples
**Example 1**
```
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[2,1,4]]
Output: 2
Explanation: Remove edges [1,1,3] and [2,1,4]; the remaining edges keep both graphs connected.
```
**Example 2**
```
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: -1
Explanation: Even after removing edges, Alice or Bob cannot connect all nodes.
```

## Approach
Use two Union‑Find (Disjoint Set) structures, one for Alice and one for Bob. Process type‑3 edges first because they benefit both. For each edge, attempt to union the endpoints; if the union fails (already connected) the edge is redundant and can be removed. After processing type‑3 edges, process type‑1 edges only in Alice's Union‑Find and type‑2 edges only in Bob's Union‑Find, counting redundant edges similarly. Finally, verify that both Union‑Find structures have a single component; otherwise return `-1`. The count of redundant edges is the answer.

```text
FUNCTION maxNumEdgesToRemove(n, edges):
    ufA ← NEW UnionFind(n)
    ufB ← NEW UnionFind(n)
    removed ← 0
    // Type 3 edges (shared)
    FOR each (type, u, v) IN edges:
        IF type = 3:
            IF NOT ufA.union(u, v):
                removed ← removed + 1
            ELSE:
                ufB.union(u, v)
    // Type 1 (Alice) and Type 2 (Bob)
    FOR each (type, u, v) IN edges:
        IF type = 1:
            IF NOT ufA.union(u, v): removed ← removed + 1
        ELSE IF type = 2:
            IF NOT ufB.union(u, v): removed ← removed + 1
    IF ufA.components ≠ 1 OR ufB.components ≠ 1:
        RETURN -1
    RETURN removed
```

## Walkthrough
For the first example, after processing type‑3 edges we connect nodes `{1,2,3}`. The redundant type‑3 edge is counted. Then type‑1 edge `[1,1,3]` is redundant (already connected) → removed. Remaining edges keep both graphs connected, total removed = 2.

## Complexity Analysis
Time: `O(E α(N))` where `α` is the inverse Ackermann function (practically constant). 
Space: `O(N)` for the two Union‑Find structures.

## Follow-Up Questions
1. How would you adapt the algorithm if edges had individual removal costs and you needed to minimize total cost?
2. Can the approach be extended to more than two users sharing the same graph?
3. What changes are needed if the graph is directed?

## Key Takeaway
Processing shared edges first and using two Union‑Find structures lets you greedily keep necessary connections while counting removable edges.
