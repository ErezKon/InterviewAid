# 1676. Lowest Common Ancestor of a Binary Tree IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv)
**Companies:** Amazon, Atlassian, Meta, Tiktok

---

## 1. Problem Description

Find the LCA of multiple nodes in a binary tree.

---

## 2. Approach: DFS with Set — O(n) ✅

```
FUNCTION lowestCommonAncestor(root, nodes):
    nodeSet = SET(nodes)
    FUNCTION dfs(node):
        IF NOT node OR node IN nodeSet: RETURN node
        left = dfs(node.left)
        right = dfs(node.right)
        IF left AND right: RETURN node
        RETURN left OR right
    RETURN dfs(root)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Identical to standard LCA but use a set of target nodes instead of checking for two specific nodes. If both subtrees return non-null, current node is the LCA.
