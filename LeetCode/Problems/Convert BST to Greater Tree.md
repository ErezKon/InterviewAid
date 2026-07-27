# 538. Convert BST to Greater Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-bst-to-greater-tree](https://leetcode.com/problems/convert-bst-to-greater-tree)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION convertBST(root):
    total = 0
    FUNCTION reverseInorder(node):
        IF NOT node: RETURN
        reverseInorder(node.right)
        total += node.val
        node.val = total
        reverseInorder(node.left)
    reverseInorder(root)
    RETURN root
```

Reverse inorder (right → root → left) with running sum.
