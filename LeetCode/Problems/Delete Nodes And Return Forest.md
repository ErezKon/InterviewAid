# 1110. Delete Nodes And Return Forest

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-nodes-and-return-forest](https://leetcode.com/problems/delete-nodes-and-return-forest)
**Companies:** Amazon, Google, Meta, Pinterest

---

## Problem Description

Delete specified nodes from a binary tree. Return the roots of all remaining trees (the forest).

---

## Approach

```
FUNCTION delNodes(root, to_delete):
    toDelete = SET(to_delete)
    result = []

    FUNCTION dfs(node, isRoot):
        IF NOT node: RETURN null
        deleted = node.val IN toDelete
        IF isRoot AND NOT deleted: result.ADD(node)
        node.left = dfs(node.left, deleted)
        node.right = dfs(node.right, deleted)
        RETURN null IF deleted ELSE node

    dfs(root, true)
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) for delete set + recursion |

---

## Key Takeaway

> **When a node is deleted, its children become new roots. Pass `isRoot` flag down: a child is a root if its parent was deleted. Post-order DFS to detach deleted nodes.**
