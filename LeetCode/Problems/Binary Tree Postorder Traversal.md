# 145. Binary Tree Postorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-postorder-traversal](https://leetcode.com/problems/binary-tree-postorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION postorderTraversal(root):
    result = []; stack = [root]
    WHILE stack:
        node = stack.POP()
        IF node == null: CONTINUE
        result.ADD(node.val)
        stack.PUSH(node.left)
        stack.PUSH(node.right)
    RETURN REVERSE(result)
```

Reverse of modified preorder (root → right → left).
