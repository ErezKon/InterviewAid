# 366. Find Leaves of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-leaves-of-binary-tree](https://leetcode.com/problems/find-leaves-of-binary-tree)
**Companies:** Amazon, Flipkart, Google, Linkedin, Oracle, Salesforce

---

```
FUNCTION findLeaves(root):
    result = []

    FUNCTION getHeight(node):
        IF node == null: RETURN -1
        h = 1 + MAX(getHeight(node.left), getHeight(node.right))
        IF h >= len(result): result.ADD([])
        result[h].ADD(node.val)
        RETURN h

    getHeight(root)
    RETURN result
```

---

## Problem Description

Collect leaves of a binary tree repeatedly until empty. Return groups of node values per round.

---

## Examples

| Input Tree | Output |
|------------|--------|
| `[1,2,3,4,5]` | `[[4,5,3],[2],[1]]` |
| `[1,2,null,3,4]` | `[[3,4,2],[1]]` |

---

## Approach

**Depth‑First Search (Post‑order) – compute node height**. The height of a node equals the maximum distance to any leaf. Nodes with the same height form a leaf‑removal round.

```text
FUNCTION findLeaves(root):
    result ← []
    FUNCTION dfs(node):
        IF node == null: RETURN -1
        left ← dfs(node.left)
        right ← dfs(node.right)
        h ← 1 + MAX(left, right)
        IF h >= LENGTH(result): result.ADD([])
        result[h].ADD(node.val)
        RETURN h
    dfs(root)
    RETURN result
```

---

## Walkthrough

Consider the tree `[1,2,3,4,5]`.

| Step | Nodes Processed | Height | result |
|------|----------------|--------|--------|
| Leaves | 4,5,3 | 0 | `[[4,5,3]]` |
| Next | 2 | 1 | `[[4,5,3],[2]]` |
| Root | 1 | 2 | `[[4,5,3],[2],[1]]` |

---

## Complexity Analysis

- **Time:** O(N) – each node visited once.
- **Space:** O(H) – recursion stack depth equals tree height.

---

## Follow‑Up Questions

1. How would you modify the algorithm to return the leaves in order of removal without grouping?
2. Can you solve the problem iteratively using BFS?
3. How does the solution change for an N‑ary tree?

---

## Key Takeaway

> **Node height = max distance to any leaf. Group by height: leaves (h=0), their parents (h=1), etc. Single DFS computes heights and groups simultaneously.**