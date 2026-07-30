# 1026. Maximum Difference Between Node and Ancestor

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-node-and-ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor)
**Companies:** Amazon, Bloomberg, Epam Systems, Josh Technology, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary tree, find the maximum `|a.val - b.val|` where `a` is an ancestor of `b`.

---

## Examples

| Tree | Explanation |
|------|-------------|
| `[[8,3,10],[1,6,null],[4,7,14]]` | The maximum difference is `7` from node `14` (descendant) and ancestor `7`. |
| `[[1,null,2,null,0]]` | The maximum difference is `2` between node `2` and ancestor `0`.

---

## Approach

Use a depth‑first search that carries the minimum and maximum values seen on the path from the root to the current node. At each node, update these extremes and compute the potential difference. The global maximum across all nodes is the answer.

```text
FUNCTION maxAncestorDiff(root):
    FUNCTION dfs(node, minVal, maxVal):
        IF node == null:
            RETURN maxVal - minVal
        minVal = MIN(minVal, node.val)
        maxVal = MAX(maxVal, node.val)
        RETURN MAX(dfs(node.left, minVal, maxVal), dfs(node.right, minVal, maxVal))
    RETURN dfs(root, root.val, root.val)
```

---

## Walkthrough

Consider the tree `[[8,3,10],[1,6,null],[4,7,14]]`.

| Step | Node | minVal | maxVal | maxDiff |
|------|------|--------|--------|---------|
| 1 | 8 (root) | 8 | 8 | 0 |
| 2 | 3 (left) | 3 | 8 | 5 |
| 3 | 1 (left‑left) | 1 | 8 | 7 |
| 4 | 6 (left‑right) | 3 | 8 | 5 |
| 5 | 7 (right of 6) | 3 | 8 | 5 |
| 6 | 10 (right) | 8 | 10 | 2 |
| 7 | 14 (right‑right) | 8 | 14 | 6 |

The largest difference observed is `7` (between 8 and 1).

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS | **O(n)** | O(h) |

---

## Follow-Up Questions

- How would you modify the algorithm to return the pair of nodes that achieve the maximum difference?
- Can the solution be adapted for a binary search tree to run in O(log n) on average?
- What changes are needed if the tree is given as an adjacency list rather than node objects?

---

## Key Takeaway

> **Track min and max ancestor values along each path.** At leaves, the max difference on that path = max - min. No need to check all ancestor pairs explicitly.
