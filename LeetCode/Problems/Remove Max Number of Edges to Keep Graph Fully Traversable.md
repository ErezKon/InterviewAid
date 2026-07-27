# 1579. Remove Max Number of Edges to Keep Graph Fully Traversable

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable)
**Companies:** De Shaw, Google, Meta, Uber

---

## Approach: Two Union-Finds — O(E·α(N)) ✅

```
FUNCTION maxNumEdgesToRemove(n, edges):
    ufA = UnionFind(n); ufB = UnionFind(n)
    removed = 0

    // Process type 3 edges first (shared by both)
    FOR [type, u, v] IN edges:
        IF type == 3:
            IF NOT ufA.union(u, v): removed += 1
            ELSE: ufB.union(u, v)

    // Process type 1 (Alice) and type 2 (Bob)
    FOR [type, u, v] IN edges:
        IF type == 1:
            IF NOT ufA.union(u, v): removed += 1
        ELSE IF type == 2:
            IF NOT ufB.union(u, v): removed += 1

    IF ufA.components != 1 OR ufB.components != 1: RETURN -1
    RETURN removed
```
