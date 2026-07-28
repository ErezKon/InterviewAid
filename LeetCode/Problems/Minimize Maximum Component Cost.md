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

Given a tree with weighted edges and an integer `k`, remove exactly `k` edges to split the tree into `k+1` components. The cost of a component is the sum of its node values. Minimize the **maximum component cost**.

---

## Examples

**Example 1:**
```
values = [4,2,1,6,5]
edges = [[0,1],[0,2],[1,3],[1,4]]
k = 1
```
Removing edge `(1,4)` creates components with costs `13` and `5`; the maximum is `13`.

**Example 2:**
```
values = [3,3,3,3]
edges = [[0,1],[1,2],[2,3]]
k = 2
```
Cut the two edges `(1,2)` and `(2,3)` → components costs `[6,3,3]`, max = `6`.

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

Consider Example 1:
1. `lo = 6` (max node value), `hi = 18` (sum of all values).
2. Mid `12` → DFS finds a subtree of cost `13` (>12) → cut once, cuts = 1 ≤ k, so `hi = 12`.
3. Mid `9` → two cuts needed (subtrees `13` and `5`), cuts = 2 > k, so `lo = 10`.
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