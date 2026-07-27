# 1469. Find All The Lonely Nodes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-the-lonely-nodes](https://leetcode.com/problems/find-all-the-lonely-nodes)
**Companies:** Microsoft

---

## Problem Description

A node is **lonely** if it's the only child of its parent. Return all lonely node values in a binary tree.

---

## Approach: DFS — O(n) ✅

```
FUNCTION getLonelyNodes(root):
    result = []
    FUNCTION dfs(node):
        IF node IS null: RETURN
        IF node.left AND NOT node.right: result.ADD(node.left.val)
        IF node.right AND NOT node.left: result.ADD(node.right.val)
        dfs(node.left); dfs(node.right)
    dfs(root)
    RETURN result
```

---

## Key Takeaway

> **DFS: at each parent, if exactly one child exists, that child is lonely. Check `left XOR right` at every node.**
