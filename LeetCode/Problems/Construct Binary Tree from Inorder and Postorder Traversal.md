# 106. Construct Binary Tree from Inorder and Postorder Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok, Walmart Labs

---

## Approach: Recursive — O(n) ✅

```
FUNCTION buildTree(inorder, postorder):
    inMap = {val: idx for idx, val in enumerate(inorder)}
    postIdx = len(postorder) - 1

    FUNCTION build(inStart, inEnd):
        IF inStart > inEnd: RETURN null

        rootVal = postorder[postIdx]
        postIdx -= 1
        root = new TreeNode(rootVal)

        inIdx = inMap[rootVal]
        // Build RIGHT first (postorder is L-R-Root, reverse = Root-R-L)
        root.right = build(inIdx + 1, inEnd)
        root.left = build(inStart, inIdx - 1)

        RETURN root

    RETURN build(0, len(inorder) - 1)
```

Same pattern as preorder+inorder (#105), but process postorder from the end and build right subtree first.
