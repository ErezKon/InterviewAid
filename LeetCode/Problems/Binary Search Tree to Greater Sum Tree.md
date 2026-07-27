# 1038. Binary Search Tree to Greater Sum Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree](https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree)
**Companies:** Amazon, Google, Microsoft, Sap

---

```
FUNCTION bstToGst(root):
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
