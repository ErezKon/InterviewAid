# 889. Construct Binary Tree from Preorder and Postorder Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION constructFromPrePost(preorder, postorder):
    IF NOT preorder: RETURN null
    root = TreeNode(preorder[0])
    IF len(preorder) == 1: RETURN root

    // Left subtree root is preorder[1]
    leftSize = postorder.INDEX(preorder[1]) + 1
    root.left = constructFromPrePost(preorder[1:leftSize+1], postorder[:leftSize])
    root.right = constructFromPrePost(preorder[leftSize+1:], postorder[leftSize:-1])
    RETURN root
```
