# 1042. Flower Planting With No Adjacent

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flower-planting-with-no-adjacent](https://leetcode.com/problems/flower-planting-with-no-adjacent)
**Companies:** Bloomberg, Vimeo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Graph Coloring — O(n) ✅](#3-approach-greedy-graph-coloring--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You have `n` gardens, labeled from `1` to `n`, and an array `paths` where `paths[i] = [x_i, y_i]` describes a bidirectional path between garden `x_i` to garden `y_i`. In each garden, you want to plant one of 4 types of flowers.

All gardens have **at most 3** paths coming into or leaving it.

Your task is to choose a flower type for each garden such that, for any two gardens connected by a path, they have different types of flowers.

Return ***any** such a choice as an array *`answer`*, where *`answer[i]`* is the type of flower planted in the *`(i+1)^th`* garden. The flower types are denoted *`1`*, *`2`*, *`3`*, or *`4`*. It is guaranteed an answer exists.*

**Constraints:**
- `1 <= n <= 10^4`
- `0 <= paths.length <= 2 * 10^4`
- `paths[i].length == 2`
- `1 <= x_i, y_i <= n`
- `x_i != y_i`
- Every garden has **at most 3** paths coming into or leaving it.

---

## 2. Key Insight

> Since each node has at most 3 neighbors and we have 4 colors, greedy coloring always works — there's always at least one color available.

---

## 3. Approach: Greedy Graph Coloring — O(n) ✅

```text
FUNCTION gardenNoAdj(n, paths):
    // Build adjacency list
    adj ← LIST of empty LISTs size n+1
    FOR each (u, v) IN paths DO
        APPEND v TO adj[u]
        APPEND u TO adj[v]

    result ← ARRAY of zeros size n+1

    FOR garden ← 1 TO n DO
        usedColors ← SET()
        FOR neighbor IN adj[garden] DO
            IF result[neighbor] != 0 THEN
                ADD result[neighbor] TO usedColors
        FOR color ← 1 TO 4 DO
            IF color NOT IN usedColors THEN
                result[garden] ← color
                BREAK

    RETURN result[1:]
```

---

## 4. Examples

**Example 1:**
```
Input: n = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]
Explanation: Gardens 1 and 2 have different types.
Gardens 2 and 3 have different types.
Gardens 3 and 1 have different types.
Hence, [1,2,3] is a valid answer. Other valid answers include [1,2,4], [1,4,2], and [3,2,1].
```

**Example 2:**
```
Input: n = 4, paths = [[1,2],[3,4]]
Output: [1,2,1,2]
```

**Example 3:**
```
Input: n = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
Output: [1,2,3,4]
```

---

## 5. Walkthrough

| Garden | Neighbors | Used Colors | Assigned Color |
|--------|-----------|-------------|----------------|
| 1      | 2,3       | {}          | 1 |
| 2      | 1,3       | {1}         | 2 |
| 3      | 1,2       | {1,2}       | 3 |
| 4      | —         | {}          | 1 |

The algorithm processes gardens sequentially, always picking the smallest available color.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + e) where e = number of paths |
| **Space** | O(n + e) for adjacency list |

---

## 7. Key Takeaway

> With max degree 3 and 4 colors, **greedy coloring** always succeeds. No backtracking needed.
