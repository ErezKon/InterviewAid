# 1135. Connecting Cities With Minimum Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/connecting-cities-with-minimum-cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost)
**Companies:** Amazon

---

## 1. Problem Description

There are `n` cities labeled from `1` to `n`. You are given the integer `n` and an array `connections` where `connections[i] = [xi, yi, costi]` indicates that the cost of connecting city `xi` and city `yi` (bidirectional connection) is `costi`.

Return *the minimum **cost** to connect all the* `n` *cities such that there is at least one path between each pair of cities*. If it is impossible to connect all the `n` cities, return `-1`.

The **cost** is the sum of the connections' costs used.

**Constraints:**
- `1 <= n <= 10^4`
- `1 <= connections.length <= 10^4`
- `connections[i].length == 3`
- `1 <= xi, yi <= n`
- `xi != yi`
- `0 <= costi <= 10^5`

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

```
Example 1:
  Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
  Output: 6
  Explanation: Choosing any 2 edges will connect all cities so we choose the minimum 2.
```
```
Example 2:
  Input: n = 4, connections = [[1,2,3],[3,4,4]]
  Output: -1
  Explanation: There is no way to connect all cities even if all edges are used.
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
