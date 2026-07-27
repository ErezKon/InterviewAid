# 107. Binary Tree Level Order Traversal II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-level-order-traversal-ii](https://leetcode.com/problems/binary-tree-level-order-traversal-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

```
FUNCTION levelOrderBottom(root):
    IF root == null: RETURN []
    result = []
    queue = [root]
    WHILE queue:
        level = []
        nextQueue = []
        FOR node IN queue:
            level.ADD(node.val)
            IF node.left: nextQueue.ADD(node.left)
            IF node.right: nextQueue.ADD(node.right)
        result.ADD(level)
        queue = nextQueue
    RETURN REVERSE(result)
```
