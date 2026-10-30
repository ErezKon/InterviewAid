# 1008. Construct Binary Search Tree from Preorder Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an array of integers `preorder`, which represents the **preorder traversal** of a BST (i.e., **binary search tree**), construct the tree and return *its root*.

It is **guaranteed** that there is always possible to find a binary search tree with the given requirements for the given test cases.

A **binary search tree** is a binary tree where for every node, any descendant of `Node.left` has a value **strictly less than** `Node.val`, and any descendant of `Node.right` has a value **strictly greater than** `Node.val`.

A **preorder traversal** of a binary tree displays the value of the node first, then traverses `Node.left`, then traverses `Node.right`.

**Constraints:**
- `1 <= preorder.length <= 100`
- `1 <= preorder[i] <= 1000`
- All the values of `preorder` are **unique**.

## Examples
```
Example 1:
  Input: preorder = [8,5,1,7,10,12]
  Output: [8,5,10,1,7,null,12]

        8
      /   \
     5    10
    / \     \
   1   7    12
```
```
Example 2:
  Input: preorder = [1,3]
  Output: [1,null,3]
```

## Approach
Recursively build the tree using an **upper‑bound** that limits node values. Process the preorder list sequentially; for each value, create a node and recursively construct its left subtree with bound = node.val, then its right subtree with the previous bound.

```text
FUNCTION bstFromPreorder(preorder):
    SET idx ← 0
    FUNCTION build(bound):
        IF idx = LEN(preorder) OR preorder[idx] > bound:
            RETURN null
        SET val ← preorder[idx]
        SET idx ← idx + 1
        SET node ← TreeNode(val)
        SET node.left ← build(val)
        SET node.right ← build(bound)
        RETURN node
    RETURN build(INFINITY)
```

## Walkthrough
| Step | idx | val | bound | Action |
|------|-----|-----|-------|--------|
| 1 | 0 | 8 | ∞ | create node 8, recurse left (bound=8) |
| 2 | 1 | 5 | 8 | create node 5, recurse left (bound=5) |
| 3 | 2 | 1 | 5 | create node 1, left/right return null |
| 4 | 3 | 7 | 5 | 7 > 5 → left null, back to node 5, recurse right (bound=8) |
| 5 | 3 | 7 | 8 | create node 7, children null |
| … | … | … | … | continue similarly for right subtree of 8 |

## Complexity Analysis
- **Time:** `O(n)` – each element is visited once.
- **Space:** `O(n)` for recursion stack in the worst case (skewed tree).

## Follow‑Up Questions
1. How would you construct the BST iteratively using a stack?
2. Can you adapt the algorithm to work with inorder + preorder traversals?
3. What changes are needed if duplicate values are allowed?

## Key Takeaway
Using a moving index and an upper bound lets you rebuild a BST from preorder in linear time without extra data structures.
