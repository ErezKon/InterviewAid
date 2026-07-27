# 3017. Count the Number of Houses at a Certain Distance II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii)
**Companies:** Oracle

---

## Problem Description

Houses numbered 1 to `n` are connected in a line (house `i` connected to `i+1`), plus one extra edge between houses `x` and `y`. For each distance `d` from 1 to `n`, count pairs `(i, j)` where `i < j` and shortest path = `d`. Return an array of length `n`.

---

## Key Insight

The linear chain plus one extra edge creates a cycle of length `|x - y| + 1`. For any pair, the shortest path is `min(direct_path, path_through_shortcut)`. Categorize pairs by their positions relative to the cycle and use difference arrays for O(n) counting instead of O(n²) brute force.

---

## Approach

```
FUNCTION countOfPairs(n, x, y):
    IF x > y: SWAP(x, y)
    result = [0] * (n + 1)  // difference array
    cycleLen = y - x + 1

    // For each pair, compute shortest distance considering the shortcut
    // Use mathematical analysis of three regions: left of x, cycle [x..y], right of y
    // Apply difference array increments for batch counting

    // ... (involves careful case analysis and range updates)
    RETURN result[1..n]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) with difference array |
| **Space** | O(n) |

---

## Key Takeaway

> **Adding one edge to a path graph creates a cycle. Shortest distances can be computed analytically by partitioning nodes into regions relative to the cycle, enabling O(n) counting with difference arrays.**
