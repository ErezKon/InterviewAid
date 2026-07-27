# 2812. Find the Safest Path in a Grid

**Difficulty:** 🟡 Medium

**Companies:** Google, Intuit, Uber
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Multi-source BFS + Binary Search — O(n² log n) ✅](#3-approach-multi-source-bfs--binary-search--on²-log-n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `n × n` grid with thieves at certain cells, find a path from (0,0) to (n-1,n-1) that maximizes the **minimum Manhattan distance** to any thief along the path.

**Constraints:**
- `1 <= n <= 400`

---

## 2. Key Insight

> First compute the safety factor (min distance to any thief) for each cell using multi-source BFS. Then binary search on the answer: "can we reach (n-1,n-1) using only cells with safety ≥ mid?"

---

## 3. Approach: Multi-source BFS + Binary Search — O(n² log n) ✅

```
FUNCTION maximumSafenessFactor(grid):
    // Step 1: Multi-source BFS from all thief cells
    dist ← BFS from all cells where grid[r][c] == 1

    // Step 2: Binary search on safety factor
    lo ← 0; hi ← n
    WHILE lo < hi DO
        mid ← (lo + hi + 1) / 2
        // BFS/DFS: can we reach (n-1,n-1) using cells with dist ≥ mid?
        IF reachable(dist, mid) THEN
            lo ← mid
        ELSE
            hi ← mid - 1

    RETURN lo
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² log n) — BFS + log n binary search iterations |
| **Space** | O(n²) |

---

## 5. Key Takeaway

> **Multi-source BFS** computes distances, then **binary search on answer** checks reachability. Alternative: max-heap Dijkstra variant for a single-pass O(n² log n) solution.
