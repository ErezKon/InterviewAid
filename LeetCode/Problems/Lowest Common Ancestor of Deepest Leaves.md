# 1123. Lowest Common Ancestor of Deepest Leaves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

Find the LCA of the deepest leaves in a binary tree.

---

## 2. Approach: DFS returning (node, depth) — O(n) ✅

```
FUNCTION lcaDeepestLeaves(root):
    FUNCTION dfs(node):
        IF NOT node: RETURN (null, 0)
        l, ld = dfs(node.left)
        r, rd = dfs(node.right)
        IF ld > rd: RETURN (l, ld + 1)
        IF rd > ld: RETURN (r, rd + 1)
        RETURN (node, ld + 1)
    RETURN dfs(root)[0]
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## 3. Key Takeaway

> Return both the LCA candidate and the depth from each subtree. If left is deeper, answer is in the left; if equal, current node is the LCA of both deepest sides.
