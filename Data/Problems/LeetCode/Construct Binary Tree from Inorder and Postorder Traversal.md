# 106. Construct Binary Tree from Inorder and Postorder Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok, Walmart Labs

---

## Problem Description
Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, reconstruct the original binary tree and return its root.

## Examples
**Example 1:**
```
inorder = [9,3,15,20,7]
postorder = [9,15,7,20,3]
Output: root of the tree
```
The tree is:
```
    3
   / \
  9  20
    /  \
   15   7
```
**Example 2:**
```
inorder = [-1]
postorder = [-1]
Output: single node tree with value -1
```

## Approach
Use a **recursive** construction. The last element of `postorder` is the root. Locate this root in `inorder` to split left/right subtrees. Recurse on right subtree first because we are consuming `postorder` from the end.

```text
FUNCTION buildTree(inorder, postorder):
    SET inMap ← MAP each value in inorder to its index
    SET postIdx ← LEN(postorder) - 1
    FUNCTION build(inStart, inEnd):
        IF inStart > inEnd:
            RETURN null
        SET rootVal ← postorder[postIdx]
        SET postIdx ← postIdx - 1
        SET root ← TreeNode(rootVal)
        SET idx ← inMap[rootVal]
        // Build right subtree first
        SET root.right ← build(idx + 1, inEnd)
        SET root.left ← build(inStart, idx - 1)
        RETURN root
    RETURN build(0, LEN(inorder) - 1)
```

## Walkthrough
| Call | inStart | inEnd | postIdx | rootVal | Action |
|------|---------|-------|---------|---------|--------|
| build(0,4) | 0 | 4 | 4 | 3 | root=3, split at idx=1 |
| build(2,4) | 2 | 4 | 3 | 20 | root.right=20, split idx=3 |
| build(4,4) | 4 | 4 | 2 | 7 | right child of 20 |
| build(2,2) | 2 | 2 | 1 | 15 | left child of 20 |
| build(0,0) | 0 | 0 | 0 | 9 | left child of 3 |

## Complexity Analysis
- **Time:** `O(n)` – each node is processed once.
- **Space:** `O(n)` for the hashmap and recursion stack.

## Follow‑Up Questions
1. How would you construct the tree iteratively using a stack?
2. Can the algorithm be adapted for preorder + inorder traversals?
3. What changes are needed if the tree contains duplicate values?

## Key Takeaway
By using the last postorder element as the root and a hashmap for quick index lookup, we can rebuild the binary tree in linear time.
