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

You have `n` gardens connected by bidirectional paths (each garden has at most 3 neighbors). Assign one of 4 flower types to each garden so no two adjacent gardens have the same flower.

**Constraints:**
- `1 <= n <= 10⁴`
- Each garden has at most 3 neighbors

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
n = 3, paths = [[1,2],[2,3],[3,1]]
output = [1,2,3]   // any assignment where adjacent gardens differ
```
*Each garden has two neighbors, and with 4 colors we can assign distinct colors.

**Example 2:**
```
n = 4, paths = [[1,2],[3,4]]
output = [1,2,1,2]
```
*Two separate components are colored independently.

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
