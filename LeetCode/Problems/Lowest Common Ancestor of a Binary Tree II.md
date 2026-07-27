# 1644. Lowest Common Ancestor of a Binary Tree II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii)
**Companies:** Atlassian, Linkedin, Meta, Microsoft

---

## 1. Problem Description

Find LCA of two nodes, but p or q might not exist in the tree. Return null if either is missing.

---

## 2. Approach: DFS with Existence Check — O(n) ✅

Unlike LCA I, p or q might not exist. Must verify both found.

```
FUNCTION lowestCommonAncestor(root, p, q):
    foundP = foundQ = false

    FUNCTION dfs(node):
        IF NOT node: RETURN null
        left = dfs(node.left)
        right = dfs(node.right)
        IF node == p: foundP = true; RETURN node
        IF node == q: foundQ = true; RETURN node
        IF left AND right: RETURN node
        RETURN left OR right

    result = dfs(root)
    RETURN result IF foundP AND foundQ ELSE null
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## 3. Key Takeaway

> Same DFS as LCA I but must traverse the entire tree (don't short-circuit) to confirm both nodes exist. Return null if either is missing.
