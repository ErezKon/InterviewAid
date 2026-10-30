# 3015. Count the Number of Houses at a Certain Distance I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i)
**Companies:** Oracle

---

## Problem Description

You are given three **positive** integers `n`, `x`, and `y`.

In a city, there exist houses numbered `1` to `n` connected by `n` streets. There is a street connecting the house numbered `i` with the house numbered `i + 1` for all `1 <= i <= n - 1`. An additional street connects the house numbered `x` with the house numbered `y`.

For each `k`, such that `1 <= k <= n`, you need to find the number of **pairs of houses** `(house1, house2)` such that the **minimum** number of streets that need to be traveled to reach `house2` from `house1` is `k`.

Return *a **1-indexed** array* `result` *of length* `n` *where* `result[k]` *represents the **total** number of pairs of houses such that the **minimum** streets required to reach a house from the other is* `k`.

**Note** that `x` and `y` can be **equal**.

**Constraints:**
- `2 <= n <= 100`
- `1 <= x, y <= n`

---

## Examples

```
Example 1:
  Input: n = 3, x = 1, y = 3
  Output: [6,0,0]
  Explanation: Every ordered pair of houses ((1,2), (2,1), (1,3), (3,1), (2,3), (3,2)) is connected directly by one street.
```

```
Example 2:
  Input: n = 5, x = 2, y = 4
  Output: [10,8,2,0,0]
  Explanation: For each distance k the pairs are:
  - For k == 1, the pairs are (1, 2), (2, 1), (2, 3), (3, 2), (2, 4), (4, 2), (3, 4), (4, 3), (4, 5), and (5, 4).
  - For k == 2, the pairs are (1, 3), (3, 1), (1, 4), (4, 1), (2, 5), (5, 2), (3, 5), and (5, 3).
  - For k == 3, the pairs are (1, 5), and (5, 1).
  - For k == 4 and k == 5, there are no pairs.
```

```
Example 3:
  Input: n = 4, x = 1, y = 1
  Output: [6,4,2,0]
  Explanation: For each distance k the pairs are:
  - For k == 1, the pairs are (1, 2), (2, 1), (2, 3), (3, 2), (3, 4), and (4, 3).
  - For k == 2, the pairs are (1, 3), (3, 1), (2, 4), and (4, 2).
  - For k == 3, the pairs are (1, 4), and (4, 1).
  - For k == 4, there are no pairs.
```

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