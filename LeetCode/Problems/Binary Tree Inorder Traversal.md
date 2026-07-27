# 94. Binary Tree Inorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-inorder-traversal](https://leetcode.com/problems/binary-tree-inorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Approaches

### Recursive — O(n)
```
FUNCTION inorderTraversal(root):
    IF root == null: RETURN []
    RETURN inorder(root.left) + [root.val] + inorder(root.right)
```

### Iterative with Stack — O(n)
```
FUNCTION inorderTraversal(root):
    result = []
    stack = []
    curr = root

    WHILE curr OR stack:
        WHILE curr:
            stack.PUSH(curr)
            curr = curr.left
        curr = stack.POP()
        result.ADD(curr.val)
        curr = curr.right

    RETURN result
```

### Morris Traversal — O(n), O(1) space
Thread right pointers to enable in-place traversal without a stack.
