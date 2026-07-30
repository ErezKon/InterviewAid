# 1740. Find Distance in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-distance-in-a-binary-tree](https://leetcode.com/problems/find-distance-in-a-binary-tree)
**Companies:** Amazon

---

## Problem Description

Find the distance (number of edges) between two nodes `p` and `q` in a binary tree.

---

## Approach: LCA + Depth — O(n) ✅

```text
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

## Examples

| Tree | p | q | Output |
|------|---|---|--------|
| `[1,2,3,null,4]` | 2 | 3 | 2 |
| `[1,2,null,3,null,4]` | 3 | 4 | 3 |

*Explanation*: The distance is the number of edges on the unique path between the two nodes.

---

## Walkthrough

Consider the tree `[1,2,3,null,4]` with `p = 2` and `q = 3`.
1. Find LCA of 2 and 3 → node `1`.
2. Compute depth from LCA to `p` (2): one edge → depth = 1.
3. Compute depth from LCA to `q` (3): one edge → depth = 1.
4. Distance = 1 + 1 = 2.

---

## Complexity Analysis

- **Time:** O(n) – each node visited at most once during LCA and depth searches.
- **Space:** O(h) – recursion stack depth `h` equals tree height.

---

## Key Takeaway

> **Distance = depth(LCA→p) + depth(LCA→q). Find LCA first, then compute depths from LCA to both nodes.**