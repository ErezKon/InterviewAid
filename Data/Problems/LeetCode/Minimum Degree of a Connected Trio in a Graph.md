# 1761. Minimum Degree of a Connected Trio in a Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-degree-of-a-connected-trio-in-a-graph](https://leetcode.com/problems/minimum-degree-of-a-connected-trio-in-a-graph)
**Companies:** Amazon, Godaddy

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Enumerate Triangles — O(n³)](#approach-enumerate-triangles--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an undirected graph with `n` nodes, a **connected trio** is a set of three nodes that are all pairwise connected. The **degree** of a trio is the number of edges where exactly one endpoint is in the trio (i.e., edges connecting the trio to outside nodes). Return the **minimum degree** of any connected trio, or `-1` if none exists.

**Constraints:**
- `2 ≤ n ≤ 400`
- `edges[i].length == 2`

---

## Examples

**Example 1:**
```
Input: n=6, edges=[[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]
Output: 3
Explanation: Trio {1,2,3}. Degree(1)=2 outside edges (4), Degree(2)=1 outside (5), Degree(3)=1 outside (6).
  But trio degree = edges with exactly one endpoint in trio = {1-4, 2-5, 3-6} = 3.
```

---

## Key Insight

> The degree of trio `{a, b, c}` = `degree(a) + degree(b) + degree(c) - 6`. The "-6" accounts for the 3 internal edges (each counted twice in the degree sums). Use an adjacency matrix for O(1) triangle detection.

---

## Approach: Enumerate Triangles — O(n³) ✅

```
FUNCTION minTrioDegree(n, edges):
    adj ← n×n adjacency matrix (boolean)
    degree ← array of size n+1, all 0

    FOR [u, v] IN edges:
        adj[u][v] ← true
        adj[v][u] ← true
        degree[u] ← degree[u] + 1
        degree[v] ← degree[v] + 1

    minDeg ← infinity
    FOR i ← 1 TO n:
        FOR j ← i+1 TO n:
            IF NOT adj[i][j]: CONTINUE
            FOR k ← j+1 TO n:
                IF adj[i][k] AND adj[j][k]:
                    trioDeg ← degree[i] + degree[j] + degree[k] - 6
                    minDeg ← MIN(minDeg, trioDeg)

    RETURN minDeg IF minDeg < infinity ELSE -1
```

---

## Walkthrough

```
n=6, edges=[[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]
degrees: 1→3, 2→3, 3→3, 4→1, 5→1, 6→1
```

Checking trio (1,2,3): adj[1][2]=✓, adj[1][3]=✓, adj[2][3]=✓ → triangle!
- Trio degree = 3 + 3 + 3 - 6 = **3** ✅

No other triangles exist.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n³) — enumerate all triples |
| **Space** | O(n²) — adjacency matrix |

---

## Follow-Up Questions

1. **Why subtract 6?** Each of the 3 internal edges contributes 1 to each endpoint's degree → 2 per edge × 3 edges = 6.
2. **Can we do better than O(n³)?** With edge-oriented enumeration and low-degree heuristics, practical runtime improves to O(E^{3/2}), but worst case remains similar.
3. **What if we want the maximum degree trio?** Same enumeration, just take max instead of min.

---

## Key Takeaway

> Finding minimum-degree triangles reduces to **triangle enumeration** + a simple degree formula: `deg(a) + deg(b) + deg(c) - 6`. An adjacency matrix enables O(1) edge lookups for the triple check.
