# 1522. Diameter of N-Ary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/diameter-of-n-ary-tree](https://leetcode.com/problems/diameter-of-n-ary-tree)
**Companies:** Goldman Sachs, Meta, Salesforce

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DFS with Top-2 Depths](#approach-dfs-with-top-2-depths)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the root of an N-ary tree, return its **diameter** — the length of the longest path between any two nodes (measured in edges). The path may or may not pass through the root.

**Constraints:**
- Nodes: `[1, 10^4]`
- `0 <= Node.val <= 10^4`
- Depth ≤ 1000

---

## Examples

**Example 1:**
```
         1
       / | \
      3  2  4
     / \
    5   6

Output: 3  (path: 5 → 3 → 1 → 2 or 5 → 3 → 1 → 4)
```

**Example 2:**
```
           1
          / \
         2   3
        / \    \
       4   5    6
      /   / \
     8   9  10
        /
       11

Output: 7  (path: 8 → 4 → 2 → 1 → 3 → 6... or the deepest path in the tree)
```

---

## Key Insight

> Generalization of binary tree diameter: at each node, the longest path through it uses the **two deepest** subtrees. Sum the top-2 child depths to get the candidate diameter, then return the deepest child + 1 upward.

```
      node
    / | | \
   d1 d2 d3 d4    ← depths from children
   
   diameter through node = top1 + top2 (two largest depths)
   depth returned upward = top1 + 1
```

---

## Approach: DFS with Top-2 Depths ✅

```
FUNCTION diameter(root):
    maxDiam = [0]
    FUNCTION depth(node):
        IF NOT node: RETURN 0
        top2 = [0, 0]
        FOR child IN node.children:
            d = depth(child)
            IF d > top2[0]: top2 = [d, top2[0]]
            ELSE IF d > top2[1]: top2[1] = d
        maxDiam[0] = MAX(maxDiam[0], top2[0] + top2[1])
        RETURN top2[0] + 1
    depth(root)
    RETURN maxDiam[0]
```

---

## Walkthrough

```
         1
       / | \
      3  2  4
     / \
    5   6
```

| Node | Children depths | Top-2 | top1+top2 | maxDiam | Returns |
|------|----------------|-------|-----------|---------|---------|
| 5    | —              | [0,0] | 0         | 0       | 1       |
| 6    | —              | [0,0] | 0         | 0       | 1       |
| 3    | [1, 1]         | [1,1] | 2         | 2       | 2       |
| 2    | —              | [0,0] | 0         | 2       | 1       |
| 4    | —              | [0,0] | 0         | 2       | 1       |
| 1    | [2, 1, 1]      | [2,1] | 3         | **3**   | 3       |

Diameter = **3** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Visit each node once |
| **Space** | O(h) | Recursion stack, h = tree height |

---

## Follow-Up Questions

**Q1: Why track top-2 instead of all children?**
> The longest path through a node uses exactly two branches (or one if it's an endpoint). The two deepest branches give the maximum. Tracking all depths wastes space.

**Q2: How does this differ from the binary tree version (LC 543)?**
> Structurally identical — binary tree is a special case with at most 2 children. The N-ary version just needs to find the top-2 among all children instead of using `left` and `right` directly.

**Q3: Can a leaf node contribute to the diameter?**
> Yes — the diameter path always starts and ends at two nodes (often leaves). A leaf returns depth 1.

---

## Key Takeaway

> **N-ary tree diameter = max over all nodes of (sum of two deepest child depths). This generalizes the binary tree diameter pattern — just track the top-2 depths instead of left/right.**
