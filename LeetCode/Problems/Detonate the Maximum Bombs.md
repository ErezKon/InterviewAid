# 2101. Detonate the Maximum Bombs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/detonate-the-maximum-bombs](https://leetcode.com/problems/detonate-the-maximum-bombs)
**Companies:** Amazon, Chime, Google, Lyft, Microsoft, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS/DFS from Each Bomb — O(n²)](#approach-bfsdfs-from-each-bomb--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a list of bombs where `bombs[i] = [xi, yi, ri]` — the bomb is at `(xi, yi)` with blast radius `ri`.

Detonating a bomb triggers **chain reactions**: if bomb `i` detonates, it detonates every bomb `j` whose center is **within or on** the blast circle of `i` (distance ≤ `ri`). Chain reactions continue recursively.

Return the **maximum** number of bombs that can be detonated by detonating **one** bomb.

**Constraints:**
- `1 <= n <= 100`
- `bombs[i] = [xi, yi, ri]`
- `1 <= xi, yi, ri <= 10^5`

---

## Examples

**Example 1:**
```
Input: bombs = [[2,1,3],[6,1,4]]
Output: 2
Explanation: Bomb 0 (radius 3) reaches bomb 1 (distance=4, 4>3 → no).
             Bomb 1 (radius 4) reaches bomb 0 (distance=4, 4≤4 → yes).
             Detonate bomb 1 → both explode.
```

**Example 2:**
```
Input: bombs = [[1,1,5],[10,10,5]]
Output: 1
Explanation: Neither bomb can reach the other (distance ≈ 12.7 > 5).
```

---

## Key Insight

> This is a **directed graph** reachability problem. Bomb `i` can trigger bomb `j` does NOT mean `j` can trigger `i` (different radii!). Build a directed graph where edge `i → j` exists if `dist(i, j) ≤ ri`. Then for each bomb, count how many bombs are reachable via BFS/DFS.

```
Bomb A (r=5)  ——→  Bomb B (r=1)     A can reach B
Bomb B (r=1)  ——✗  Bomb A (r=5)     B cannot reach A (too small radius)
```

---

## Approach: BFS/DFS from Each Bomb — O(n²) ✅

```
FUNCTION maximumDetonation(bombs):
    n = len(bombs)
    // Build directed graph: bomb i can detonate bomb j if dist(i,j) <= r_i
    graph = [[] for _ in range(n)]
    FOR i, j in all pairs:
        IF dist(bombs[i], bombs[j]) <= bombs[i][2]:
            graph[i].ADD(j)

    maxCount = 0
    FOR i ← 0 TO n - 1:
        count = BFS/DFS from i
        maxCount = MAX(maxCount, count)

    RETURN maxCount
```

**Distance check** (use squared distance to avoid floating point):
```
dx = x_i - x_j
dy = y_i - y_j
canDetonate = dx*dx + dy*dy <= r_i * r_i
```

---

## Walkthrough

```
bombs = [[2,1,3], [6,1,4]]
```

**Build graph:**
- Bomb 0 → Bomb 1: dist = |6-2| = 4, r₀ = 3, 4 > 3 → NO edge
- Bomb 1 → Bomb 0: dist = 4, r₁ = 4, 4 ≤ 4 → edge 1→0

Graph: `{0: [], 1: [0]}`

**BFS from each:**
- From 0: visits {0} → count = 1
- From 1: visits {1, 0} → count = 2

Max = **2** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n³) | n BFS/DFS traversals, each O(n + E) where E ≤ n² |
| **Space** | O(n²) | Adjacency list |

For n ≤ 100, O(n³) = 10⁶ which is fast.

---

## Follow-Up Questions

**Q1: Why directed and not undirected?**
> Bomb A reaching bomb B doesn't mean B reaches A — they have different radii. This asymmetry makes the graph directed.

**Q2: Could you use Union-Find?**
> Not directly, because Union-Find handles undirected connectivity. Directed reachability requires BFS/DFS or transitive closure.

**Q3: Why use squared distance?**
> Avoids floating-point errors. `sqrt(dx² + dy²) ≤ r` is equivalent to `dx² + dy² ≤ r²`, and all values are integers.

**Q4: What if n were very large (10⁵)?**
> You'd need spatial indexing (e.g., grid bucketing or k-d tree) to efficiently find which bombs are within radius, reducing the graph construction from O(n²) to near-linear.

---

## Key Takeaway

> **Chain reaction problems are directed graph reachability — build edges based on the trigger condition (asymmetric!), then BFS/DFS from each starting node to find the maximum cascade.**
