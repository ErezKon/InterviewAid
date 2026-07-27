# 173. Binary Search Tree Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-iterator](https://leetcode.com/problems/binary-search-tree-iterator)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Approach: Controlled Inorder with Stack — O(1) avg, O(h) space ✅

```
CLASS BSTIterator:
    CONSTRUCTOR(root):
        stack = []
        pushLeft(root)

    FUNCTION next():
        node = stack.POP()
        pushLeft(node.right)
        RETURN node.val

    FUNCTION hasNext():
        RETURN stack is not empty

    FUNCTION pushLeft(node):
        WHILE node:
            stack.PUSH(node)
            node = node.left
```

Iterative inorder traversal. Stack stores at most O(h) nodes.
