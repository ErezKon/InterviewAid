# 1182. Shortest Distance to Target Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-target-color](https://leetcode.com/problems/shortest-distance-to-target-color)
**Companies:** Google

---

## Problem Description

Given array `colors` (values 1, 2, or 3) and queries `[index, color]`, for each query find the shortest distance from `index` to any occurrence of the target `color`. Return -1 if the color doesn't exist.

---

## Approach: Precompute with Two Passes

```
FUNCTION shortestDistanceColor(colors, queries):
    n ← len(colors)
    // For each color c, precompute nearest[c][i] = min distance from i to nearest c
    nearest ← 3 arrays of size n
    FOR c IN [1, 2, 3]:
        // Left to right
        pos ← -n
        FOR i ← 0 TO n-1:
            IF colors[i] == c: pos ← i
            nearest[c][i] ← i - pos
        // Right to left
        pos ← 2*n
        FOR i ← n-1 DOWN TO 0:
            IF colors[i] == c: pos ← i
            nearest[c][i] ← MIN(nearest[c][i], pos - i)

    RETURN [nearest[color][idx] if nearest[color][idx] < n else -1 for idx, color in queries]
```

| Time | Space |
|------|-------|
| O(n + q) | O(n) |
