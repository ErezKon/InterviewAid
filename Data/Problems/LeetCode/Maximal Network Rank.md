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

There is an infrastructure of `n` cities with some number of `roads` connecting these cities. Each `roads[i] = [a_i, b_i]` indicates that there is a bidirectional road between cities `a_i` and `b_i`.

The **network rank*** *of **two different cities** is defined as the total number of **directly** connected roads to **either** city. If a road is directly connected to both cities, it is only counted **once**.

The **maximal network rank **of the infrastructure is the **maximum network rank** of all pairs of different cities.

Given the integer `n` and the array `roads`, return *the **maximal network rank** of the entire infrastructure*.

**Constraints:**
- `2 <= n <= 100`
- `0 <= roads.length <= n * (n - 1) / 2`
- `roads[i].length == 2`
- `0 <= a_i, b_i <= n-1`
- `a_i != b_i`
- Each pair of cities has **at most one** road connecting them.

---

## Examples

**Example 1:**
```
![img](https://assets.leetcode.com/uploads/2020/09/21/ex1.png)
Input: n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
Output: 4
Explanation: The network rank of cities 0 and 1 is 4 as there are 4 roads that are connected to either 0 or 1. The road between 0 and 1 is only counted once.
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2020/09/21/ex2.png)
Input: n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]
Output: 5
Explanation: There are 5 roads that are connected to cities 1 or 2.
```

**Example 3:**
```
Input: n = 8, roads = [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]]
Output: 5
Explanation: The network rank of 2 and 5 is 5. Notice that all the cities do not have to be connected.
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
