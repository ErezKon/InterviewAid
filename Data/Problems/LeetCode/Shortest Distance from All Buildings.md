# 317. Shortest Distance from All Buildings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-distance-from-all-buildings](https://leetcode.com/problems/shortest-distance-from-all-buildings)
**Companies:** Amazon, Apple, Applied Intuition, Bloomberg, Bytedance, Doordash, Google, Meta, Microsoft, Tiktok, Uber, Waymo, Wix, Zenefits

---

## Problem Description

Given a grid with buildings (1), obstacles (2), and empty land (0), find the empty cell with the minimum **total distance** to all buildings. Return -1 if no valid cell exists.

---

## Approach: BFS from Each Building — O(B·m·n) ✅

```text
FUNCTION shortestDistance(grid):
    m, n ← dimensions of grid
    buildings ← list of coordinates where grid[r][c] = 1
    dist ← m×n matrix of zeros      // total distance from all buildings
    reach ← m×n matrix of zeros     // count of buildings that can reach this cell

    FOR each (br, bc) IN buildings:
        queue ← [(br, bc)]
        visited ← matrix of false, mark (br, bc) true
        level ← 0
        WHILE queue NOT EMPTY:
            level ← level + 1
            FOR each cell (r, c) IN current queue size:
                FOR each neighbor (nr, nc) of (r, c) in four directions:
                    IF inside grid AND NOT visited[nr][nc] AND grid[nr][nc] = 0:
                        visited[nr][nc] ← true
                        dist[nr][nc] ← dist[nr][nc] + level
                        reach[nr][nc] ← reach[nr][nc] + 1
                        ENQUEUE(queue, (nr, nc))

    minDist ← infinity
    FOR each cell (r, c) WHERE grid[r][c] = 0:
        IF reach[r][c] = LENGTH(buildings):
            minDist ← MIN(minDist, dist[r][c])
    RETURN minDist IF minDist ≠ infinity ELSE -1
```

---

## Examples

**Example 1:**
```
Input: grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
Output: 7
Explanation: The empty land at (1,2) has total distance 7 to all three buildings, which is minimal.
```

**Example 2:**
```
Input: grid = [[1,0],[0,2]]
Output: -1
Explanation: No empty land can reach both buildings because the obstacle blocks the path.
```

---

## Walkthrough

Consider Example 1.

1. Buildings are at (0,0), (0,4), (2,2).
2. BFS from (0,0) updates distances to reachable empty cells, e.g., (0,1) distance 1, (1,0) distance 1, etc.
3. BFS from (0,4) adds its distances to the same `dist` matrix.
4. BFS from (2,2) adds its distances.
5. After all three BFS runs, cell (1,2) has `reach = 3` (reachable from all buildings) and `dist = 7`, which is the minimum.

---

## Complexity Analysis

- **Time:** For each of the `B` buildings we perform a BFS over the `m·n` grid → O(B·m·n).
- **Space:** Two auxiliary `m×n` matrices (`dist` and `reach`) plus the BFS queue → O(m·n).

---

## Follow-Up Questions

- How would you modify the algorithm for weighted edges (different movement costs)?
- Can you solve the problem in O(m·n) time without BFS from every building?
- What if the grid is very large but sparse? How would you use a more efficient data structure?

---

## Key Takeaway

> Performing BFS from each building accumulates distances to empty lands while tracking reachability, enabling identification of the optimal empty cell.
