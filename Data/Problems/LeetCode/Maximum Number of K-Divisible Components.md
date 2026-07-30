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

Given a tree with `n` nodes, each having a value `values[i]`, and an integer `k`, remove edges to split the tree into the **maximum number of connected components** such that each component's sum of values is divisible by `k`.

**Constraints:**
- `1 <= n <= 3 × 10^4`
- `1 <= values[i] <= 10^9`
- `1 <= k <= 10^9`
- The total sum of values is divisible by k.

---

## Examples

**Example 1:**
```
Input:  n=5, edges=[[0,2],[1,2],[1,3],[2,4]], values=[1,8,1,4,4], k=6
Output: 2
Explanation: Remove edge (1,2). Component {0,2,4} sum=6, component {1,3} sum=12. Both ÷6.
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
