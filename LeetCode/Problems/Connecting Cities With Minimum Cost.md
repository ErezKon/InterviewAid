# 1135. Connecting Cities With Minimum Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/connecting-cities-with-minimum-cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost)
**Companies:** Amazon

---

## 1. Problem Description

Given `n` cities and weighted edges `connections`, find the minimum cost to connect all cities. Return -1 if impossible. This is the **Minimum Spanning Tree** problem.

---

## 2. Approach: Kruskal's Algorithm — O(E log E) ✅

```
FUNCTION minimumCost(n, connections):
    SORT connections by cost
    uf = UnionFind(n)
    totalCost = 0
    edgesUsed = 0
    
    FOR city1, city2, cost IN connections:
        IF uf.find(city1) != uf.find(city2):
            uf.union(city1, city2)
            totalCost += cost
            edgesUsed += 1
            IF edgesUsed == n - 1: RETURN totalCost
    
    RETURN -1  // not fully connected
```

| Time | Space |
|------|-------|
| O(E log E) | O(n) |

---

## Key Takeaway

> Classic MST via Kruskal's: sort edges by weight, greedily add if it connects two components using Union-Find. Need exactly `n-1` edges for a spanning tree.
