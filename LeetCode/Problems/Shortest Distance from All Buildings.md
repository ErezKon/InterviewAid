# 317. Shortest Distance from All Buildings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-distance-from-all-buildings](https://leetcode.com/problems/shortest-distance-from-all-buildings)
**Companies:** Amazon, Apple, Applied Intuition, Bloomberg, Bytedance, Doordash, Google, Meta, Microsoft, Tiktok, Uber, Waymo, Wix, Zenefits

---

## Problem Description

Given a grid with buildings (1), obstacles (2), and empty land (0), find the empty cell with the minimum **total distance** to all buildings. Return -1 if no valid cell exists.

---

## Approach: BFS from Each Building — O(B·m·n) ✅

```
FUNCTION shortestDistance(grid):
    buildings = count of buildings
    dist = m×n matrix of zeros      // total distance
    reach = m×n matrix of zeros     // buildings that can reach this cell

    FOR each building (r, c):
        BFS from (r, c), accumulating distances to empty cells
        Mark which empty cells are reachable

    // Find empty cell reachable by all buildings with minimum total distance
    minDist = infinity
    FOR each empty cell (r, c):
        IF reach[r][c] == buildings:
            minDist = MIN(minDist, dist[r][c])

    RETURN minDist IF minDist != infinity ELSE -1
```

BFS from buildings (not empty cells) to avoid TLE. Only cells reachable by ALL buildings are candidates.
