# 993. Cousins in Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/cousins-in-binary-tree](https://leetcode.com/problems/cousins-in-binary-tree)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description

Two nodes are **cousins** if they have the same depth but different parents. Given values `x` and `y`, return whether they are cousins.

---

## Approach

```
FUNCTION isCousins(root, x, y):
    // BFS tracking parent and depth
    queue = [(root, null, 0)]
    xInfo = yInfo = null

    WHILE queue:
        (node, parent, depth) = queue.DEQUEUE()
        IF node.val == x: xInfo = (parent, depth)
        IF node.val == y: yInfo = (parent, depth)
        IF node.left: queue.ENQUEUE((node.left, node, depth + 1))
        IF node.right: queue.ENQUEUE((node.right, node, depth + 1))

    RETURN xInfo[1] == yInfo[1] AND xInfo[0] != yInfo[0]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Cousins = same depth, different parents. BFS tracking (parent, depth) for each node, then compare the two target nodes' info.**
