# 3613. Minimize Maximum Component Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-maximum-component-cost](https://leetcode.com/problems/minimize-maximum-component-cost)
**Companies:** Apple, Google, Microsoft, Salesforce

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an undirected connected graph with n` nodes labeled from 0 to n - 1` and a 2D integer array edges` where edges[i] = [u_i, v_i, w_i]` denotes an undirected edge between node u_i` and node v_i` with weight w_i`, and an integer k`.

You are allowed to remove any number of edges from the graph such that the resulting graph has **at most** k` connected components.

The **cost** of a component is defined as the **maximum** edge weight in that component. If a component has no edges, its cost is 0.

Return the **minimum** possible value of the **maximum** cost among all components **after such removals**.

**Constraints:**
- `1 <= n <= 5 * 10^4`
- `0 <= edges.length <= 10^5`
- `edges[i].length == 3`
- `0 <= u_i, v_i < n`
- `1 <= w_i <= 10^6`
- `1 <= k <= n`
- The input graph is connected.

---

## Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1,4],[1,2,3],[1,3,2],[3,4,6]], k = 2
Output: 4
Explanation:
  Remove the edge between nodes 3 and 4 (weight 6).
  The resulting components have costs of 0 and 4, so the overall maximum cost is 4.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1,5],[1,2,5],[2,3,5]], k = 1
Output: 5
Explanation:
  No edge can be removed, since allowing only one component (k = 1) requires the graph to stay fully connected.
  That single component’s cost equals its largest edge weight, which is 5.
```

---

## Key Insight

> **Binary search on the answer.** For a candidate max cost `C`, greedily check: traverse the tree and whenever a subtree's cost exceeds `C`, cut it off (increment cuts). If cuts ≤ k, `C` is feasible.

---

## Approach

```text
FUNCTION minimizeMaxCost(tree, values, k):
    lo ← MAX(values)
    hi ← SUM(values)
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        IF canSplit(tree, values, k, mid) THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    RETURN lo

FUNCTION canSplit(tree, values, k, maxCost):
    cuts ← 0
    FUNCTION dfs(node, parent):
        subtreeSum ← values[node]
        FOR child IN tree[node] DO
            IF child ≠ parent THEN
                subtreeSum ← subtreeSum + dfs(child, node)
        IF subtreeSum > maxCost THEN
            cuts ← cuts + 1
            RETURN 0    // cut this subtree off
        RETURN subtreeSum
    dfs(root, -1)
    RETURN cuts ≤ k
```

---

## Walkthrough

Consider Example 1:
1. `lo = 6` (max node value), `hi = 18` (sum of all values).
2. Mid `12` → DFS finds a subtree of cost `13` (>12) → cut once, cuts = 1 ≤ k, so `hi = 12`.
3. Mid `9` → two cuts needed (subtrees `13` and `5`), cuts = 2 > k, so `lo = 10`.
4. Continue narrowing until `lo = hi = 13`, the minimal feasible maximum component cost.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + DFS | **O(n log S)** | **O(n)** |

Where `S` is the sum of all node values.

---

## Key Takeaway

> **Binary search on component cost + greedy DFS** — a classic pattern for tree partitioning problems. Cut whenever a subtree exceeds the budget.

---