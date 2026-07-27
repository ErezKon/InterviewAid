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

```
FUNCTION gardenNoAdj(n, paths):
    adj ← adjacency list from paths
    result ← [0] * (n + 1)

    FOR g ← 1 TO n DO
        usedColors ← {result[neighbor] for neighbor in adj[g]}
        FOR color ← 1 TO 4 DO
            IF color NOT IN usedColors THEN
                result[g] ← color
                BREAK

    RETURN result[1:]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + e) where e = edges |
| **Space** | O(n + e) — adjacency list |

---

## 5. Key Takeaway

> With max degree 3 and 4 colors, **greedy coloring** always succeeds. No backtracking needed.
