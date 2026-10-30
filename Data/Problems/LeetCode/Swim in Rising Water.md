# 778. Swim in Rising Water

**Difficulty:** 🔴 Hard
**Acceptance:** 61.0%
**LeetCode:** [https://leetcode.com/problems/swim-in-rising-water](https://leetcode.com/problems/swim-in-rising-water)
**Companies:** Amazon, De Shaw, Doordash, Google, Meta, Microsoft, Uber, Weride

---

## 1. Problem Description

You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`.

It starts raining, and water gradually rises over time. At time `t`, the water level is `t`, meaning **any** cell with elevation less than equal to `t` is submerged or reachable.

You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most `t`. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return *the minimum time until you can reach the bottom right square* `(n - 1, n - 1)` *if you start at the top left square* `(0, 0)`.

**Constraints:**
- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[i][j] < n^2`
- Each value `grid[i][j]` is **unique**.

---

## 2. Examples

**Example 1:**
```
Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.
```

**Example 2:**
```
Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation: The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
```

---

## 3. Approach: Min-Heap (Modified Dijkstra) — O(n² log n) ✅

```text
FUNCTION swimInWater(grid):
    n ← LENGTH(grid)
    visited ← n×n matrix of FALSE
    heap ← MIN-HEAP containing (grid[0][0], 0, 0) // (max elevation so far, row, col)
    visited[0][0] ← TRUE

    WHILE heap NOT EMPTY:
        (maxElev, r, c) ← heap.POP_MIN()
        IF r = n-1 AND c = n-1:
            RETURN maxElev
        FOR (dr, dc) IN [(1,0),(-1,0),(0,1),(0,-1)]:
            nr ← r + dr; nc ← c + dc
            IF 0 ≤ nr < n AND 0 ≤ nc < n AND NOT visited[nr][nc]:
                visited[nr][nc] ← TRUE
                newMax ← MAX(maxElev, grid[nr][nc])
                heap.PUSH((newMax, nr, nc))
    RETURN -1
```

---

## 4. Walkthrough

**Example Grid:** `[[0,2],[1,3]]`

1. Start heap with `(0,0,0)`. Pop → maxElev=0 at (0,0).
2. Explore neighbors: (1,0) elevation 1 → push `(1,1,0)`; (0,1) elevation 2 → push `(2,0,1)`.
3. Pop smallest maxElev → `(1,1,0)`. Not target, explore its neighbor (1,1) elevation 3 → push `(3,1,1)`.
4. Pop `(2,0,1)`. Not target, neighbor (1,1) already visited.
5. Pop `(3,1,1)` which is bottom‑right cell → return 3.

The algorithm always expands the path with the smallest possible maximum elevation first.

---

## 5. Complexity Analysis

- **Time:** O(n² log n) – each cell may be pushed to the heap once; heap operations cost log (n²).
- **Space:** O(n²) for the visited matrix and heap.

---

## 6. Follow-Up Questions

1. How would you solve the problem using binary search combined with BFS/DFS?
2. Can the algorithm be adapted for a 3‑dimensional elevation map?
3. What changes are needed if diagonal moves are allowed?

---

## Key Takeaway

> "Minimize the maximum value along any path" = modified Dijkstra where edge weight is the max elevation. The min‑heap always explores the path with the smallest maximum elevation first.
