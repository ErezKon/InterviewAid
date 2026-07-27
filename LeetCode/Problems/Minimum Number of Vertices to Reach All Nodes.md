# 1557. Minimum Number of Vertices to Reach All Nodes

**Difficulty:** 🟡 Medium
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes)
**Companies:** Airbnb, Google, Meta, Microsoft

---

## Approach: Find Nodes with No Incoming Edges — O(V+E) ✅

```
FUNCTION findSmallestSetOfVertices(n, edges):
    hasIncoming = set()
    FOR [from, to] IN edges:
        hasIncoming.ADD(to)

    RETURN [i for i in range(n) if i not in hasIncoming]
```

Nodes with no incoming edges must be starting points — they can't be reached from any other node.
