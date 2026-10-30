# 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance)
**Companies:** Amazon, Google, Meta, Microsoft, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Floyd-Warshall — O(n³) ✅](#4-approach-floyd-warshall--on³-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There are `n` cities numbered from `0` to `n-1`. Given the array `edges` where `edges[i] = [fromi, toi, weighti]` represents a bidirectional and weighted edge between cities `fromi` and `toi`, and given the integer `distanceThreshold`.

Return the city with the smallest number of cities that are reachable through some path and whose distance is **at most** `distanceThreshold`. If there are multiple such cities, return the city with the greatest number.

Notice that the distance of a path connecting cities ***i*** and ***j*** is equal to the sum of the edges' weights along that path.

**Constraints:**
- `2 <= n <= 100`
- `1 <= edges.length <= n * (n - 1) / 2`
- `edges[i].length == 3`
- `0 <= fromi < toi < n`
- `1 <= weighti, distanceThreshold <= 10⁴`
- All pairs `(fromi, toi)` are distinct.

---

## 2. Examples

```
Example 1:
  Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
  Output: 3
  Explanation: The neighboring cities at a distanceThreshold = 4 for each city are:
    City 0 -> [City 1, City 2]
    City 1 -> [City 0, City 2, City 3]
    City 2 -> [City 0, City 1, City 3]
    City 3 -> [City 1, City 2]
  Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return
  city 3 since it has the greatest number.

Example 2:
  Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
  Output: 0
  Explanation: The neighboring cities at a distanceThreshold = 2 for each city are:
    City 0 -> [City 1]
    City 1 -> [City 0, City 4]
    City 2 -> [City 3, City 4]
    City 3 -> [City 2, City 4]
    City 4 -> [City 1, City 2, City 3]
  The city 0 has 1 neighboring city at a distanceThreshold = 2.
```

---

## 3. Key Insight

> Compute **all-pairs shortest paths** with Floyd-Warshall (n ≤ 100 makes O(n³) feasible). Then for each city, count how many other cities are within the threshold.

---

## 4. Approach: Floyd-Warshall — O(n³) ✅

```
FUNCTION findTheCity(n, edges, distanceThreshold):
    dist = n×n of infinity
    FOR i: dist[i][i] = 0
    FOR [u, v, w] IN edges: dist[u][v] = dist[v][u] = w

    // Floyd-Warshall
    FOR k, i, j: dist[i][j] = MIN(dist[i][j], dist[i][k] + dist[k][j])

    minCount = infinity; result = 0
    FOR i ← 0 TO n - 1:
        count = SUM(1 for j if dist[i][j] <= distanceThreshold)
        IF count <= minCount:
            minCount = count
            result = i

    RETURN result
```

---

## 5. Walkthrough

```
n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], threshold=4

After Floyd-Warshall, shortest distances:
     0    1    2    3
0  [ 0,   3,   4,   4 ]
1  [ 3,   0,   1,   2 ]
2  [ 4,   1,   0,   1 ]
3  [ 4,   2,   1,   0 ]

Count neighbors within threshold=4:
  City 0: reachable = {1(3), 2(4), 3(4)} → 3 neighbors
  City 1: reachable = {0(3), 2(1), 3(2)} → 3 neighbors
  City 2: reachable = {0(4), 1(1), 3(1)} → 3 neighbors
  City 3: reachable = {1(2), 2(1)} → 2 neighbors ← fewest

Result: 3 ✅ (fewest neighbors, and greatest numbered among ties)
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n³) — Floyd-Warshall |
| **Space** | O(n²) — distance matrix |

---

## 7. Follow-Up Questions

### 7.1 Why Floyd-Warshall over Dijkstra?

With n ≤ 100, Floyd-Warshall is simpler and computes all pairs in one shot. Dijkstra from each node would be O(n · (n + E) log n).

### 7.2 What if n is very large (e.g., 10⁵)?

Use Dijkstra from each node with early termination (stop when distance exceeds threshold). Or use BFS if weights are uniform.

### 7.3 Why return the greatest-numbered city on ties?

The `<=` comparison in `IF count <= minCount` naturally picks the later (greater-numbered) city on ties.

---

## 8. Key Takeaway

> **Floyd-Warshall + count neighbors** is the textbook approach for small-n all-pairs reachability problems. The triple loop is O(n³) but clean and easy to implement.
