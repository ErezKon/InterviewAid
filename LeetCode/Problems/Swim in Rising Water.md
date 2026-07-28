# 778. Swim in Rising Water

**Difficulty:** 🔴 Hard
**Acceptance:** 61.0%
**LeetCode:** [https://leetcode.com/problems/swim-in-rising-water](https://leetcode.com/problems/swim-in-rising-water)
**Companies:** Amazon, De Shaw, Doordash, Google, Meta, Microsoft, Uber, Weride

---

## 1. Problem Description

Given an n×n grid where `grid[i][j]` represents elevation, find the minimum time `t` such that you can swim from `(0,0)` to `(n-1,n-1)`. At time `t`, you can be at any cell with elevation ≤ t.

---

## 2. Examples

| Grid | Minimum Time |
|------|--------------|
| `[[0,2],[1,3]]` | 3 |
| `[[0,1,2,3],[2,2,3,4],[3,2,5,6],[4,5,6,7]]` | 7 |
| `[[5,4,3],[6,1,2],[7,8,9]]` | 9 |

*Explanation:* The swimmer must wait until the highest elevation on the chosen path is reachable.

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
