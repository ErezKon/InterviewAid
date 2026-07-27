# 3613. Minimize Maximum Component Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-maximum-component-cost](https://leetcode.com/problems/minimize-maximum-component-cost)
**Companies:** Apple, Google, Microsoft, Salesforce

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a tree with weighted edges and an integer `k`, remove exactly `k` edges to split the tree into `k+1` components. The cost of a component is the sum of its node values. Minimize the **maximum component cost**.

---

## Key Insight

> **Binary search on the answer.** For a candidate max cost `C`, greedily check: traverse the tree and whenever a subtree's cost exceeds `C`, cut it off (increment cuts). If cuts ≤ k, `C` is feasible.

---

## Approach: Binary Search + DFS Greedy — O(n log S) ✅

```
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

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + DFS | **O(n log S)** | **O(n)** |

Where S = sum of all values.

---

## Key Takeaway

> **Binary search on component cost + greedy DFS** — a classic pattern for tree partitioning problems. Cut whenever a subtree exceeds the budget.

---
