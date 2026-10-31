# 1319. Number of Operations to Make Network Connected

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-operations-to-make-network-connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected)
**Companies:** Akuna Capital, Amazon, Bloomberg, Google, Ibm, Intuit, Meta, Microsoft, Phonepe, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find — O(E · α(V))](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables `connections` forming a network where `connections[i] = [a_i, b_i]` represents a connection between computers `a_i` and `b_i`. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network `connections`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return *the minimum number of times you need to do this in order to make all the computers connected*. If it is not possible, return `-1`.

**Constraints:**
- `1 <= n <= 10^5`
- `1 <= connections.length <= min(n * (n - 1) / 2, 10^5)`
- `connections[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- There are no repeated connections.
- No two computers are connected by more than one cable.

---

## 2. Key Insight

> At least `n-1` edges are needed to connect `n` nodes. If the total number of edges is less than `n-1`, the task is impossible. Otherwise, the answer equals the number of connected components minus one, because each redundant edge can be repurposed to bridge two components.

---

## 3. Approach: Union-Find — O(E · α(V)) ✅

```text
FUNCTION makeConnected(n, connections):
    IF LENGTH(connections) < n - 1:
        RETURN -1    // not enough cables

    uf ← UnionFind(n)
    FOR [a, b] IN connections:
        uf.union(a, b)

    components ← COUNT_UNIQUE(uf.find(i) FOR i IN 0..n-1)
    RETURN components - 1
```

---

## 4. Examples

**Example 1:**
```
Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.
```

**Example 2:**
```
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2
```

**Example 3:**
```
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: There are not enough cables.
```

---

## 5. Walkthrough

**Example 1** (`n = 4`, `connections = [[0,1],[0,2],[1,2]]`)

1. Initialize Union-Find with 4 separate sets: `{0},{1},{2},{3}`.
2. Process `[0,1]` → merge sets `{0,1}`.
3. Process `[0,2]` → merge `{0,1}` with `{2}` → `{0,1,2}`.
4. Process `[1,2]` → already in the same set, counted as redundant.
5. After all unions, we have two components: `{0,1,2}` and `{3}`.
6. Redundant edges = 1, components = 2 → answer = `components - 1 = 1`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E · α(V)) |
| **Space** | O(V) |

---

## 7. Follow-Up Questions

1. How would the solution change if the network were directed?
2. Can you solve the problem using only DFS/BFS without Union-Find?
3. How would you extend the approach to also output the actual cable moves?

---

## 8. Key Takeaway

> **Components − 1 moves are sufficient** when enough edges exist (≥ n-1). Redundant edges can always be repurposed to connect disjoint components.
