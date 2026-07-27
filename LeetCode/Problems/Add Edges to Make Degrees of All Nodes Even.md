# 2508. Add Edges to Make Degrees of All Nodes Even

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even](https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even)
**Companies:** Hrt, Uber

---

## 1. Problem Description

Given an undirected graph with `n` nodes and `edges`, determine if you can add **at most 2** edges (no duplicates, no self-loops) to make every node's degree **even**.

**Constraints:**
- `3 ≤ n ≤ 10⁵`
- `2 ≤ edges.length ≤ 10⁵`

---

## 2. Key Insight

> Count nodes with odd degree. Only 0, 2, or 4 odd-degree nodes are fixable with ≤ 2 edges:
> - **0 odd nodes:** Already valid.
> - **2 odd nodes (a, b):** Add edge (a,b) if not exists, or find node c connected to neither.
> - **4 odd nodes (a, b, c, d):** Try all 3 pairings, check if edges don't already exist.
> - **Other counts:** Impossible (each added edge changes parity of exactly 2 nodes).

---

## 3. Approach: Case Analysis — O(n + E) ✅

```
FUNCTION isPossible(n, edges):
    adj = build adjacency sets
    odds = [v for v if degree[v] is odd]

    IF len(odds) == 0: RETURN true
    IF len(odds) == 2:
        a, b = odds
        IF b NOT IN adj[a]: RETURN true    // add (a,b)
        // Find a node c not adjacent to either
        FOR c ← 1 TO n:
            IF c != a AND c != b AND c NOT IN adj[a] AND c NOT IN adj[b]:
                RETURN true
        RETURN false
    IF len(odds) == 4:
        a, b, c, d = odds
        // Try all 3 pairings: (ab,cd), (ac,bd), (ad,bc)
        RETURN canPair(a,b,c,d,adj) OR canPair(a,c,b,d,adj) OR canPair(a,d,b,c,adj)
    RETURN false

FUNCTION canPair(a, b, c, d, adj):
    RETURN b NOT IN adj[a] AND d NOT IN adj[c]
```

| Time | Space |
|------|-------|
| O(n + E) | O(n + E) |

---

## Key Takeaway

> The handshake lemma constrains odd-degree counts. With at most 2 edges, only 0/2/4 odd-degree nodes are solvable. Enumerate pairings for 4 odd nodes; for 2 odd nodes, either connect them directly or route through a helper node.
