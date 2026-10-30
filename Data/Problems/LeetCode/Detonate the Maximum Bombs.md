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

You are given a list of bombs. The **range** of a bomb is defined as the area where its effect can be felt. This area is in the shape of a **circle** with the center as the location of the bomb.

The bombs are represented by a **0-indexed** 2D integer array `bombs` where `bombs[i] = [x_i, y_i, r_i]`. `x_i` and `y_i` denote the X-coordinate and Y-coordinate of the location of the `i^th` bomb, whereas `r_i` denotes the **radius** of its range.

You may choose to detonate a **single** bomb. When a bomb is detonated, it will detonate **all bombs** that lie in its range. These bombs will further detonate the bombs that lie in their ranges.

Given the list of `bombs`, return *the **maximum** number of bombs that can be detonated if you are allowed to detonate **only one** bomb*.

**Constraints:**
- `1 <= bombs.length <= 100`
- `bombs[i].length == 3`
- `1 <= x_i, y_i, r_i <= 10^5`

---

## Examples

**Example 1:**
```
Input: bombs = [[2,1,3],[6,1,4]]
Output: 2
Explanation: The above figure shows the positions and ranges of the 2 bombs.
If we detonate the left bomb, the right bomb will not be affected.
But if we detonate the right bomb, both bombs will be detonated.
So the maximum bombs that can be detonated is max(1, 2) = 2.
```

**Example 2:**
```
Input: bombs = [[1,1,5],[10,10,5]]
Output: 1
Explanation: Detonating either bomb will not detonate the other bomb, so the maximum number of bombs that can be detonated is 1.
```

**Example 3:**
```
Input: bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]
Output: 5
Explanation: The best bomb to detonate is bomb 0 because:
- Bomb 0 detonates bombs 1 and 2. The red circle denotes the range of bomb 0.
- Bomb 2 detonates bomb 3. The blue circle denotes the range of bomb 2.
- Bomb 3 detonates bomb 4. The green circle denotes the range of bomb 3.
Thus all 5 bombs are detonated.
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
