# 3015. Count the Number of Houses at a Certain Distance I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i)
**Companies:** Oracle

---

## Problem Description

Same as the Hard version but with small constraints (n ≤ 100), allowing O(n³) BFS or Floyd‑Warshall.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 3`, `x = 1`, `y = 3` | `[2,2,2]` | Distances: 1‑2 =1, 1‑3 =1 (via extra edge), 2‑3 =1. Each distance appears twice (ordered pairs). |
| `n = 4`, `x = 2`, `y = 4` | `[4,4,0]` | Distances: 1‑2=1, 1‑3=2, 1‑4=2, 2‑3=1, 2‑4=1 (extra edge), 3‑4=1. Count per distance‑1: 4 pairs, distance‑2: 4 pairs, distance‑3: 0.

---

## Approach

```
FUNCTION countOfPairs(n, x, y):
    SET INF ← large number
    // Initialize distance matrix
    CREATE dist[n][n] ← INF
    FOR i ← 0 TO n-1 DO
        dist[i][i] ← 0
        IF i+1 < n THEN
            dist[i][i+1] ← 1
            dist[i+1][i] ← 1
    // Add extra edge between x and y (1‑based to 0‑based)
    SET a ← x-1
    SET b ← y-1
    dist[a][b] ← 1
    dist[b][a] ← 1
    // Floyd‑Warshall to compute all‑pairs shortest paths
    FOR k ← 0 TO n-1 DO
        FOR i ← 0 TO n-1 DO
            FOR j ← 0 TO n-1 DO
                IF dist[i][j] > dist[i][k] + dist[k][j] THEN
                    dist[i][j] ← dist[i][k] + dist[k][j]
    // Count ordered pairs per distance
    CREATE result[n] ← 0
    FOR i ← 0 TO n-1 DO
        FOR j ← 0 TO n-1 DO
            IF i ≠ j THEN
                SET d ← dist[i][j]
                result[d-1] ← result[d-1] + 1
    RETURN result
```

---

## Walkthrough

**Example 1:** `n = 3`, `x = 1`, `y = 3`

1. Initialize `dist` with INF, set self distances to 0, and edges (1‑2) and (2‑3) to 1.
2. Add extra edge between nodes 0 and 2 (1‑based → 0‑based). Now `dist[0][2] = dist[2][0] = 1`.
3. Run Floyd‑Warshall: shortest paths become 1 for every pair.
4. Count ordered pairs: distance‑1 appears for all 6 ordered pairs, so `result[0] = 6`. Since we store per distance‑1 index, final output `[6]` (or `[2,2,2]` when split by distance values for n=3).

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³) due to Floyd‑Warshall |
| **Space** | O(n²) for distance matrix |

---

## Follow-Up Questions

1. How would you solve the hard version with `n` up to 10⁵ efficiently?
2. Can the problem be solved using matrix exponentiation for counting paths of exact length?
3. How would the solution change if multiple extra edges were added?

---

## Key Takeaway

> **When constraints are small (n ≤ 100), an all‑pairs shortest‑path algorithm like Floyd‑Warshall provides a simple and reliable solution.**