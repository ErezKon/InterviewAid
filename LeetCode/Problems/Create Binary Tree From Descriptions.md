# 2196. Create Binary Tree From Descriptions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/create-binary-tree-from-descriptions](https://leetcode.com/problems/create-binary-tree-from-descriptions)
**Companies:** Amazon, Clari, Google, Linkedin, Uber

---

## Problem Description

Given `[parent, child, isLeft]` descriptions, construct the binary tree and return its root.

---

## Approach

```
FUNCTION createBinaryTree(descriptions):
    nodes = {}; children = set()
    FOR [parent, child, isLeft] IN descriptions:
        IF parent NOT IN nodes: nodes[parent] = TreeNode(parent)
        IF child NOT IN nodes: nodes[child] = TreeNode(child)
        IF isLeft: nodes[parent].left = nodes[child]
        ELSE: nodes[parent].right = nodes[child]
        children.ADD(child)

    // Root = the node that's never a child
    FOR val IN nodes:
        IF val NOT IN children: RETURN nodes[val]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Build a node map from descriptions, track which values appear as children. The root is the only value that's a parent but never a child.**
