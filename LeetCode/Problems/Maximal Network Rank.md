# 1615. Maximal Network Rank

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximal-network-rank](https://leetcode.com/problems/maximal-network-rank)
**Companies:** Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Degree Count + Edge Set — O(n²)](#approach-degree-count--edge-set--on²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There are `n` cities and some bidirectional roads. The **network rank** of two different cities is the total number of roads directly connected to either city — counted once if a road connects both.

Return the **maximal network rank** of any pair of cities.

**Constraints:**
- `2 ≤ n ≤ 100`
- `0 ≤ roads.length ≤ n(n-1)/2`
- Each road connects two different cities, no duplicate roads.

---

## Examples

**Example 1:**
```
Input:  n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
Output: 4
Explanation: Cities 0 and 1 have degrees 2 and 3.
             They share edge (0,1), so rank = 2 + 3 - 1 = 4.
```

**Example 2:**
```
Input:  n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]
Output: 5
```

---

## Key Insight

> For any pair `(a, b)`: `rank = degree[a] + degree[b] - (1 if edge(a,b) exists else 0)`. Precompute degrees and store edges in a set for O(1) lookup. Try all pairs.

---

## Approach: Degree Count + Edge Set — O(n²) ✅

```
FUNCTION maximalNetworkRank(n, roads):
    degree = [0] * n
    edges = SET()

    FOR [a, b] IN roads:
        degree[a] += 1
        degree[b] += 1
        edges.ADD((MIN(a,b), MAX(a,b)))

    maxRank = 0
    FOR i ← 0 TO n - 2:
        FOR j ← i + 1 TO n - 1:
            rank = degree[i] + degree[j]
            IF (i, j) IN edges:
                rank -= 1
            maxRank = MAX(maxRank, rank)

    RETURN maxRank
```

---

## Walkthrough

```
n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
degree = [2, 3, 1, 2]
edges = {(0,1), (0,3), (1,2), (1,3)}
```

| Pair  | degree sum | shared edge? | rank |
|-------|-----------|--------------|------|
| (0,1) | 2+3=5     | yes          | 4    |
| (0,2) | 2+1=3     | no           | 3    |
| (0,3) | 2+2=4     | yes          | 3    |
| (1,2) | 3+1=4     | yes          | 3    |
| (1,3) | 3+2=5     | yes          | **4** |
| (2,3) | 1+2=3     | no           | 3    |

**Result:** 4 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute force all pairs | **O(n² + E)** | O(E) |

With n ≤ 100, this is at most 5000 pairs — very fast.

---

## Follow-Up Questions

**Q1: Can you do better than O(n²)?**
For small n (≤ 100), it's unnecessary. For large n, you could focus on the top-2 degree nodes, but the edge case where they're connected complicates things. O(n²) is clean and sufficient.

**Q2: What's the maximum possible network rank?**
`2(n-1) - 1 = 2n - 3`, when both nodes connect to all other nodes and also to each other.

**Q3: How does this relate to graph theory?**
Network rank is related to the concept of node degree centrality. It measures how "central" a pair of nodes is in the graph.

---

## Key Takeaway

> **Network rank = sum of degrees minus shared edge.** Precompute degrees and use an edge set for O(1) lookup. The brute-force O(n²) approach is optimal for the given constraints.
