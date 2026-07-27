# 1740. Find Distance in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-distance-in-a-binary-tree](https://leetcode.com/problems/find-distance-in-a-binary-tree)
**Companies:** Amazon

---

## Problem Description

Find the distance (number of edges) between two nodes `p` and `q` in a binary tree.

---

## Approach: LCA + Depth — O(n) ✅

```
FUNCTION findDistance(root, p, q):
    lca = findLCA(root, p, q)
    RETURN depth(lca, p, 0) + depth(lca, q, 0)

FUNCTION depth(node, target, d):
    IF node IS null: RETURN -1
    IF node.val == target: RETURN d
    left = depth(node.left, target, d + 1)
    IF left != -1: RETURN left
    RETURN depth(node.right, target, d + 1)
```

---

## Key Takeaway

> **Distance = depth(LCA→p) + depth(LCA→q). Find LCA first, then compute depths from LCA to both nodes.**
