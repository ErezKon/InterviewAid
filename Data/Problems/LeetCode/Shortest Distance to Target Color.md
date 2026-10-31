# 1182. Shortest Distance to Target Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-target-color](https://leetcode.com/problems/shortest-distance-to-target-color)
**Companies:** Google

---

## Problem Description

You are given an array `colors`, in which there are three colors: `1`, `2` and `3`.

You are also given some queries. Each query consists of two integers `i` and `c`, return the shortest distance between the given index `i` and the target color `c`. If there is no solution return `-1`.

**Constraints:**

- `1 <= colors.length <= 5*10^4`
- `1 <= colors[i] <= 3`
- `1 <= queries.length <= 5*10^4`
- `queries[i].length == 2`
- `0 <= queries[i][0] < colors.length`
- `1 <= queries[i][1] <= 3`

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

```
Example 1:
  Input: colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]]
  Output: [3,0,3]
  Explanation:
  The nearest 3 from index 1 is at index 4 (3 steps away).
  The nearest 2 from index 2 is at index 2 itself (0 steps away).
  The nearest 1 from index 6 is at index 3 (3 steps away).
```

```
Example 2:
  Input: colors = [1,2], queries = [[0,3]]
  Output: [-1]
  Explanation: There is no 3 in the array.
```

---

## Walkthrough

1. **Pre-processing** – For each of the three colors, run two passes over `colors` to fill `nearest[color][i]` with the distance from position `i` to the closest occurrence of that color.
2. **Query resolution** – For a query `[idx, col]`, look up `nearest[col-1][idx]`. If the stored distance is ≥ n, the color never appears, so return -1; otherwise return the distance.

---

## Complexity Analysis

- **Time:** O(n + q) where `n` is the length of `colors` and `q` is the number of queries (pre-processing O(3·n) plus O(1) per query).
- **Space:** O(3·n) for the `nearest` arrays.

---

## Key Takeaway

> Pre-computing nearest distances for each possible target enables answering many distance queries in constant time per query.
