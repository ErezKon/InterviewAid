# 1008. Construct Binary Search Tree from Preorder Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION bstFromPreorder(preorder):
    idx = 0

    FUNCTION build(bound):
        IF idx >= len(preorder) OR preorder[idx] > bound: RETURN null
        val = preorder[idx]; idx += 1
        node = TreeNode(val)
        node.left = build(val)
        node.right = build(bound)
        RETURN node

    RETURN build(infinity)
```

O(n). Use upper bound to determine when to stop building left subtree.
