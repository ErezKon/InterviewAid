# 144. Binary Tree Preorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-preorder-traversal](https://leetcode.com/problems/binary-tree-preorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

```
FUNCTION preorderTraversal(root):
    result = []
    stack = [root]
    WHILE stack:
        node = stack.POP()
        IF node == null: CONTINUE
        result.ADD(node.val)
        stack.PUSH(node.right)
        stack.PUSH(node.left)
    RETURN result
```
