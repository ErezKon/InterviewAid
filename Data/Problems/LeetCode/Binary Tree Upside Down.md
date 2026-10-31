# 156. Binary Tree Upside Down

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-upside-down](https://leetcode.com/problems/binary-tree-upside-down)
**Companies:** Google, Linkedin

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the `root` of a binary tree, turn the tree upside down and return *the new root*.

You can turn a binary tree upside down with the following steps:

- The original left child becomes the new root.
- The original root becomes the new right child.
- The original right child becomes the new left child.

![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/0100-0199/0156.Binary%20Tree%20Upside%20Down/images/main.jpg)
The mentioned steps are done level by level. It is **guaranteed** that every right node has a sibling (a left node with the same parent) and has no children.

**Constraints:**
- The number of nodes in the tree will be in the range `[0, 10]`.
- `1 <= Node.val <= 10`
- Every right node in the tree has a sibling (a left node that shares the same parent).
- Every right node in the tree has no children.

## Examples

**Example 1:**
```
Input: root = [1,2,3,4,5]
Output: [4,5,2,null,null,3,1]
```

**Example 2:**
```
Input: root = []
Output: []
```

**Example 3:**
```
Input: root = [1]
Output: [1]
```

## Approach
Use recursion (postorder). Recurse to the leftmost node, which becomes the new root. While unwinding, rewire the current node: set its left child's left to its right child, and its left child's right to the node itself, then nullify the node's left and right pointers.

```text
FUNCTION upsideDownBinaryTree(root):
    IF root == null OR root.left == null: RETURN root
    newRoot ← upsideDownBinaryTree(root.left)
    root.left.left ← root.right
    root.left.right ← root
    root.left ← null
    root.right ← null
    RETURN newRoot
```

## Walkthrough
For the tree `[[1,2,3],[4,5,null],[6,null,null]]`:
1. Recurse to leftmost node `4` → returns `4` as newRoot.
2. Unwind to node `2`: set `2.left.left = 2.right (5)`, `2.left.right = 2`, nullify `2`'s children.
3. Unwind to node `1`: set `1.left.left = 1.right (3)`, `1.left.right = 1`, nullify `1`'s children.
4. Final structure has root `4` with left child `5` and right child `2`, etc.

## Complexity Analysis
- Time: O(n) – each node visited once.
- Space: O(h) – recursion stack depth `h` (worst-case O(n)).

## Follow-Up Questions
- How would you implement the transformation iteratively using a stack?
- Can you perform the operation in O(1) extra space by modifying pointers in place?
- How does the algorithm change for a tree that is not a full binary tree?

## Key Takeaway
A postorder recursion lets you rewire each node after processing its left subtree, enabling an elegant upside-down transformation of a binary tree.
