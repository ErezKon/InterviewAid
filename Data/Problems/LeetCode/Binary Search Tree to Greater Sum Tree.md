# 1038. Binary Search Tree to Greater Sum Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree](https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree)
**Companies:** Amazon, Google, Microsoft, Sap

---

## Problem Description
Given the root of a binary search tree (BST), transform it into a Greater Sum Tree where each node's new value equals the sum of all values greater than or equal to the node's original value. Return the root of the modified tree. Constraints: number of nodes ≤ 10⁴, node values fit in 32‑bit signed integer.

## Examples
| Input BST (inorder) | Output Greater Sum Tree (inorder) |
|----------------------|-----------------------------------|
| 2 → 1,3 | 5 → 6,3 |
| 5 → 2,13,3 | 20 → 18,13,5 |

## Approach
**Reverse Inorder Traversal** – Perform a reverse inorder (right → node → left) while maintaining a running sum of visited node values. Update each node with the current sum.

```text
FUNCTION bstToGst(root):
    SET total ← 0
    FUNCTION reverseInorder(node):
        IF node IS NULL: RETURN
        CALL reverseInorder(node.right)
        SET total ← total + node.val
        SET node.val ← total
        CALL reverseInorder(node.left)
    CALL reverseInorder(root)
    RETURN root
```

## Walkthrough
For BST `[2,1,3]`:
1. Visit right child `3`: total=3, node.val=3.
2. Visit root `2`: total=3+2=5, node.val=5.
3. Visit left child `1`: total=5+1=6, node.val=6.
Resulting tree values in inorder: `6,5,3`.

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack depth equals tree height.

## Follow-Up Questions
- How would you implement the transformation iteratively without recursion?
- Can you adapt the algorithm for a tree that is not a BST?
- What changes are needed to perform the conversion in-place for a threaded binary tree?

## Key Takeaway
A reverse inorder traversal accumulates the sum of larger keys, allowing each node to be updated to the required greater‑sum value in linear time.