# 889. Construct Binary Tree from Preorder and Postorder Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given two integer arrays `preorder` and `postorder` representing the preorder and postorder traversals of a **full binary tree** (each node has either 0 or 2 children), reconstruct the binary tree and return its root.

## Examples
**Example 1:**
```
preorder = [1,2,4,5,3,6,7]
postorder = [4,5,2,6,7,3,1]
Output: root of the tree
```
The tree is:
```
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
```
**Example 2:**
```
preorder = [1]
postorder = [1]
Output: single node tree with value 1
```

## Approach
Recursively build the tree. The first element of `preorder` is the root. The next element is the root of the left subtree; locate it in `postorder` to determine the size of the left subtree. Recurse on the left and right parts accordingly.

```text
FUNCTION constructFromPrePost(preorder, postorder):
    IF preorder IS EMPTY:
        RETURN null
    SET rootVal ← preorder[0]
    SET root ← TreeNode(rootVal)
    IF LEN(preorder) = 1:
        RETURN root
    // left subtree root is preorder[1]
    SET leftRootVal ← preorder[1]
    SET leftSize ← INDEX_OF(leftRootVal IN postorder) + 1
    SET root.left ← constructFromPrePost(preorder[1 : leftSize + 1], postorder[0 : leftSize])
    SET root.right ← constructFromPrePost(preorder[leftSize + 1 : ], postorder[leftSize : -1])
    RETURN root
```

## Walkthrough
| Call | preorder | postorder | rootVal | leftSize | Action |
|------|----------|-----------|---------|----------|--------|
| 1 | [1,2,4,5,3,6,7] | [4,5,2,6,7,3,1] | 1 | 3 | root=1, left subtree size=3 |
| 2 (left) | [2,4,5] | [4,5,2] | 2 | 2 | root=2, left subtree size=2 |
| 3 (left-left) | [4] | [4] | 4 | - | leaf node 4 |
| 4 (left-right) | [5] | [5] | 5 | - | leaf node 5 |
| 5 (right) | [3,6,7] | [6,7,3] | 3 | 2 | root=3, left subtree size=2 |
| 6 (right-left) | [6] | [6] | 6 | - | leaf node 6 |
| 7 (right-right) | [7] | [7] | 7 | - | leaf node 7 |

## Complexity Analysis
- **Time:** `O(n)` – each node is visited once.
- **Space:** `O(n)` for recursion stack in the worst case (skewed tree).

## Follow‑Up Questions
1. How would you adapt the algorithm for trees that are not full (nodes may have a single child)?
2. Can you implement an iterative version using a stack?
3. What changes are needed to handle duplicate values in the traversals?

## Key Takeaway
Identifying the left subtree size via the next preorder element’s position in postorder enables reconstruction of a full binary tree using simple recursion.
