# 1135. Connecting Cities With Minimum Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/connecting-cities-with-minimum-cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost)
**Companies:** Amazon

---

## 1. Problem Description

Given `n` cities and weighted edges `connections`, find the minimum cost to connect all cities. Return -1 if impossible. This is the **Minimum Spanning Tree** problem.

---

## 2. Approach: Kruskal's Algorithm — O(E log E) ✅

```text
FUNCTION minimumCost(n, connections):
    SORT connections BY cost ASCENDING
    uf ← UnionFind(n)
    totalCost ← 0
    edgesUsed ← 0
    
    FOR each (city1, city2, cost) IN connections:
        IF uf.find(city1) ≠ uf.find(city2):
            uf.union(city1, city2)
            totalCost ← totalCost + cost
            edgesUsed ← edgesUsed + 1
            IF edgesUsed = n - 1:
                RETURN totalCost
    
    RETURN -1  // not fully connected
```

---

## Examples

**Example 1:**
```
Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
Output: 6
Explanation: Choose edges (2,3,1) and (1,2,5) for total cost 6.
```

**Example 2:**
```
Input: n = 4, connections = [[1,2,3],[3,4,4]]
Output: -1
Explanation: Cities 1 and 2 are disconnected from 3 and 4.
```

---

## Walkthrough

Consider `n = 3` with connections `[[1,2,5],[1,3,6],[2,3,1]]`.

| Step | Sorted Edge | Action | UF Components | Total Cost |
|------|--------------|--------|---------------|------------|
| 1    | (2,3,1)      | Union 2 & 3 | {1},{2,3} | 1 |
| 2    | (1,2,5)      | Union 1 & 2 | {1,2,3} | 6 |
| 3    | (1,3,6)      | Skipped (already connected) | — | 6 |

After adding two edges (`n-1`), MST cost = 6.

---

## Complexity Analysis

- **Time:** O(E log E) for sorting edges plus near‑constant Union‑Find operations.
- **Space:** O(n) for the Union‑Find data structure and O(E) for storing edges.

---

## Follow-Up Questions

- How would you solve the problem using Prim's algorithm?
- Can you adapt the solution to handle dynamic addition of edges?
- What changes are needed if the graph is directed?

---

## Key Takeaway

> Classic MST via Kruskal's: sort edges by weight, greedily add if it connects two components using Union-Find. Need exactly `n-1` edges for a spanning tree.
