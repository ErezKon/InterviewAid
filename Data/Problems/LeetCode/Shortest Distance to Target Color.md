# 1182. Shortest Distance to Target Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-target-color](https://leetcode.com/problems/shortest-distance-to-target-color)
**Companies:** Google

---

## Problem Description

Given an integer array `colors` where each element is 1, 2, or 3, and a list of queries `[[index, color], ...]`, for each query return the shortest distance from `index` to any occurrence of `color` in `colors`. If the target color does not appear, return -1.

---

## Approach

```text
FUNCTION shortestDistanceColor(colors, queries):
    n ← len(colors)
    // Precompute nearest distance for each color at every position
    nearest ← ARRAY[3][n]
    FOR c IN [1, 2, 3]:
        // Left to right pass
        pos ← -n
        FOR i ← 0 TO n-1:
            IF colors[i] == c: pos ← i
            nearest[c-1][i] ← i - pos
        // Right to left pass
        pos ← 2*n
        FOR i ← n-1 DOWN TO 0:
            IF colors[i] == c: pos ← i
            nearest[c-1][i] ← MIN(nearest[c-1][i], pos - i)
    RETURN [nearest[color-1][idx] IF nearest[color-1][idx] < n ELSE -1 FOR idx, color IN queries]
```

---

## Examples

| colors | queries | output |
|--------|---------|--------|
| [1,2,3,2,1] | [[0,2],[2,1],[4,3]] | [1,2,-1] |
| [3,3,3] | [[1,2],[2,1]] | [-1,-1] |

---

## Walkthrough

1. **Pre‑processing** – For each of the three colors, run two passes over `colors` to fill `nearest[color][i]` with the distance from position `i` to the closest occurrence of that color.
2. **Query resolution** – For a query `[idx, col]`, look up `nearest[col‑1][idx]`. If the stored distance is ≥ n, the color never appears, so return -1; otherwise return the distance.

---

## Complexity Analysis

- **Time:** O(n + q) where `n` is the length of `colors` and `q` is the number of queries (pre‑processing O(3·n) plus O(1) per query).
- **Space:** O(3·n) for the `nearest` arrays.

---

## Key Takeaway

> Pre‑computing nearest distances for each possible target enables answering many distance queries in constant time per query.
