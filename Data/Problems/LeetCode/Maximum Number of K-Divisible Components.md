# 2872. Maximum Number of K-Divisible Components

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-k-divisible-components](https://leetcode.com/problems/maximum-number-of-k-divisible-components)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is an undirected tree with `n` nodes labeled from `0` to `n - 1`. You are given the integer `n` and a 2D integer array `edges` of length `n - 1`, where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

You are also given a **0-indexed** integer array `values` of length `n`, where `values[i]` is the **value** associated with the `i`th node, and an integer `k`.

A **valid split** of the tree is obtained by removing any set of edges, possibly empty, from the tree such that the resulting components all have values that are divisible by `k`, where the **value of a connected component** is the sum of the values of its nodes.

Return *the **maximum number of components** in any valid split*.

**Constraints:**
- `1 <= n <= 3 × 10^4`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `values.length == n`
- `0 <= values[i] <= 10^9`
- `1 <= k <= 10^9`
- Sum of `values` is divisible by `k`.
- The input is generated such that `edges` represents a valid tree.

---

## Examples

```
Example 1:
  Input: n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
  Output: 2
  Explanation: We remove the edge connecting node 1 with 2. The resulting split is valid because:
    - The value of the component containing nodes 1 and 3 is values[1] + values[3] = 12.
    - The value of the component containing nodes 0, 2, and 4 is values[0] + values[2] + values[4] = 6.
    It can be shown that no other valid split has more than 2 connected components.
```

```
Example 2:
  Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
  Output: 3
  Explanation: We remove the edge connecting node 0 with 2, and the edge connecting node 0 with 1. The resulting split is valid because:
    - The value of the component containing node 0 is values[0] = 3.
    - The value of the component containing nodes 2, 5, and 6 is values[2] + values[5] + values[6] = 9.
    - The value of the component containing nodes 1, 3, and 4 is values[1] + values[3] + values[4] = 6.
    It can be shown that no other valid split has more than 3 connected components.
```

---

## Key Insight

> **DFS from any root**. Compute subtree sums bottom-up. Whenever a subtree sum is divisible by `k`, we can "cut" that subtree off (it forms a valid component). Return 0 to the parent, effectively removing the subtree's contribution.

---

## Approach

```
FUNCTION maxKDivisibleComponents(n, edges, values, k)
    graph ← adjacency list from edges
    components ← 0

    FUNCTION dfs(node, parent)
        subtreeSum ← values[node]

        FOR each child IN graph[node] DO
            IF child = parent THEN CONTINUE
            subtreeSum ← subtreeSum + dfs(child, node)

        IF subtreeSum MOD k = 0 THEN
            components ← components + 1
            RETURN 0    // cut this subtree
        RETURN subtreeSum

    dfs(0, -1)
    RETURN components
END FUNCTION
```

---

## Walkthrough

```
Tree:    0 — 2 — 1 — 3
              |
              4
values = [1, 8, 1, 4, 4], k = 6
```

DFS from 0:
- dfs(4, 2): subtree = 4. 4%6≠0 → return 4
- dfs(3, 1): subtree = 4. 4%6≠0 → return 4
- dfs(1, 2): subtree = 8+4=12. 12%6=0 → **cut!** components=1, return 0
- dfs(2, 0): subtree = 1+4+0=5. 5%6≠0 → return 5
- dfs(0, -1): subtree = 1+5=6. 6%6=0 → **cut!** components=2

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single DFS traversal |
| Space  | **O(n)** — recursion stack + adjacency list |

---

## Follow-Up Questions

1. **Why does greedy cutting work?**
   If a subtree sums to a multiple of k, cutting it can only help (or not hurt) — the remaining tree still has sum divisible by k.

2. **What if the total sum isn't divisible by k?**
   Then it's impossible to split into valid components. Return 0 or -1.

3. **What if the tree were a general graph?**
   Would need to find spanning tree first or use different decomposition.

---

## Key Takeaway

> **Greedy subtree cutting** — DFS bottom-up, and whenever a subtree sum is divisible by k, cut it off. Each cut creates one more component. Simple O(n) and provably optimal.
