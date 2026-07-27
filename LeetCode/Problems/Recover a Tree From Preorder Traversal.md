# 1028. Recover a Tree From Preorder Traversal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/recover-a-tree-from-preorder-traversal](https://leetcode.com/problems/recover-a-tree-from-preorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION recoverFromPreorder(traversal):
    stack = []
    i = 0

    WHILE i < len(traversal):
        depth = 0
        WHILE i < len(traversal) AND traversal[i] == '-':
            depth += 1; i += 1

        val = 0
        WHILE i < len(traversal) AND traversal[i].isdigit():
            val = val * 10 + int(traversal[i]); i += 1

        node = TreeNode(val)
        WHILE len(stack) > depth: stack.POP()

        IF stack:
            IF NOT stack[-1].left: stack[-1].left = node
            ELSE: stack[-1].right = node

        stack.PUSH(node)

    RETURN stack[0]
```
