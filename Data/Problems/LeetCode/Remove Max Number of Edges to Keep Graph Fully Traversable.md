# 1579. Remove Max Number of Edges to Keep Graph Fully Traversable

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable)
**Companies:** De Shaw, Google, Meta, Uber

---

## Problem Description

Alice and Bob have an undirected graph of `n` nodes and three types of edges:

- Type 1: Can be traversed by Alice only.
- Type 2: Can be traversed by Bob only.
- Type 3: Can be traversed by both Alice and Bob.

Given an array `edges` where `edges[i] = [type_i, u_i, v_i]` represents a bidirectional edge of type `type_i` between nodes `u_i` and `v_i`, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

Return *the maximum number of edges you can remove, or return* `-1` *if Alice and Bob cannot fully traverse the graph.*

**Constraints:**
- `1 <= n <= 10^5`
- `1 <= edges.length <= min(10^5, 3 * n * (n - 1) / 2)`
- `edges[i].length == 3`
- `1 <= type_i <= 3`
- `1 <= u_i < v_i <= n`
- All tuples `(type_i, u_i, v_i)` are distinct.

## Examples

**Example 1:**
```
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.
```

**Example 2:**
```
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: 0
Explanation: Notice that removing any edge will not make the graph fully traversable by Alice and Bob.
```

**Example 3:**
```
Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
Output: -1
Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.
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
