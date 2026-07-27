# 103. Binary Tree Zigzag Level Order Traversal

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Bytedance, Citadel, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Nutanix, Oracle, Palo Alto Networks, Sigmoid, Tiktok, Walmart Labs, Yandex

---

## 1. Problem Description

Given the root of a binary tree, return the zigzag level order traversal (left-to-right, then right-to-left, alternating).

---

## 2. Approach: BFS with Direction Flag — O(n) ✅

```
FUNCTION zigzagLevelOrder(root):
    IF root == null: RETURN []
    result = []
    queue = [root]
    leftToRight = true

    WHILE queue not empty:
        levelSize = queue.SIZE()
        level = []
        FOR i ← 0 TO levelSize - 1:
            node = queue.DEQUEUE()
            level.ADD(node.val)
            IF node.left: queue.ENQUEUE(node.left)
            IF node.right: queue.ENQUEUE(node.right)

        IF NOT leftToRight:
            REVERSE(level)

        result.ADD(level)
        leftToRight = !leftToRight

    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Standard BFS level order with a flag to reverse alternate levels. Alternatively, use a deque and append to front/back based on direction.
