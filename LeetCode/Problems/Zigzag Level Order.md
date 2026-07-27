# 103. Binary Tree Zigzag Level Order Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Bytedance, Citadel, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Nutanix, Oracle, Palo Alto Networks, Sigmoid, Tiktok, Walmart Labs, Yandex

---

## Approach: BFS + Alternate Direction — O(n) ✅

```
FUNCTION zigzagLevelOrder(root):
    IF root == null: RETURN []
    result = []
    queue = [root]
    leftToRight = true

    WHILE queue:
        level = []
        FOR i ← 0 TO queue.SIZE() - 1:
            node = queue.DEQUEUE()
            level.ADD(node.val)
            IF node.left: queue.ENQUEUE(node.left)
            IF node.right: queue.ENQUEUE(node.right)

        IF NOT leftToRight: REVERSE(level)
        result.ADD(level)
        leftToRight = NOT leftToRight

    RETURN result
```

Standard BFS with level reversal on odd levels. Or use a deque and alternate append direction.
