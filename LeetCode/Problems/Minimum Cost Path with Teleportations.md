# 3651. Minimum Cost Path with Teleportations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-path-with-teleportations](https://leetcode.com/problems/minimum-cost-path-with-teleportations)
**Companies:** Amazon, Google, Meta, Visa

---

## Key Insight

> Regular edges have weights; teleportation between same-color nodes has a fixed cost. Build a graph with both edge types and run **Dijkstra**. To avoid O(n²) teleport edges, use a "color supernode" pattern — connect each node to its color node with half the teleport cost.

---

## Approach: Dijkstra with Color Supernodes ✅

```
FUNCTION minCostTeleport(n, edges, colors, teleportCost):
    // Build adjacency list with regular edges
    // Add supernode per color: node→colorNode and colorNode→node
    // each with cost teleportCost/2 (round-trip = teleportCost)
    
    graph ← adjacency list
    FOR edge IN edges DO graph.ADD(edge)
    
    // Add color supernodes (indexed n, n+1, ...)
    FOR each color c DO
        superNode ← n + c
        FOR node WITH color c DO
            graph.ADD(node → superNode, cost=0)
            graph.ADD(superNode → node, cost=teleportCost)
    
    // Dijkstra from source to target
    RETURN dijkstra(graph, source, target)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Dijkstra + supernodes | **O((V+E) log V)** | **O(V + E)** |

---

## Key Takeaway

> **Color supernodes avoid quadratic teleport edges** — connect each node to its color's supernode, reducing the graph to linear size while preserving shortest paths.

---
