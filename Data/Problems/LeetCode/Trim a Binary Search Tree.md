# 669. Trim a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/trim-a-binary-search-tree](https://leetcode.com/problems/trim-a-binary-search-tree)
**Companies:** Adobe, Amazon, Bloomberg, Flipkart, Google

---

## Problem Description
Given the root of a binary search tree (BST) and two integers `low` and `high`, trim the tree so that all its nodes have values in the inclusive range `[low, high]`. The resulting tree should maintain the BST property. Return the root of the trimmed BST.

## Examples
**Example 1:**
```
Input: root = [1,0,2], low = 1, high = 2
Output: [1,null,2]
Explanation: Node with value 0 is removed because it is less than low.
```

**Example 2:**
```
Input: root = [3,0,4,null,2,2], low = 2, high = 3
Output: [3,2,3]
Explanation: Nodes with values 0 and 4 are removed; remaining nodes form a valid BST within range.
```

## Approach
Recursively trim the tree:
- If the current node is `null`, return `null`.
- If node value < `low`, discard the left subtree and recurse on the right.
- If node value > `high`, discard the right subtree and recurse on the left.
- Otherwise, recursively trim both children and attach them back.

**Pseudocode**
```text
FUNCTION trimBST(root, low, high):
    IF root = null:
        RETURN null
    IF root.val < low:
        RETURN trimBST(root.right, low, high)
    IF root.val > high:
        RETURN trimBST(root.left, low, high)
    SET root.left ← trimBST(root.left, low, high)
    SET root.right ← trimBST(root.right, low, high)
    RETURN root
```

## Walkthrough
| Node | Condition | Action |
|------|-----------|--------|
| 1 (value 1) | within range | recurse both children |
| 0 (left child) | < low | replace node with result of trimming right child (null) |
| 2 (right child) | within range | keep as is |
Resulting tree: 1 → right child 2.

## Complexity Analysis
- Time: O(n) where n is the number of nodes, each visited once.
- Space: O(h) recursion stack, h = height of the tree (worst‑case O(n)).

## Follow‑Up Questions
1. How would you implement an iterative version using a stack?
2. Can you modify the algorithm to return the number of nodes removed?
3. What changes are needed if the tree is not a BST but a generic binary tree?

## Key Takeaway
By leveraging BST ordering, you can discard entire subtrees that fall outside the desired range, achieving an efficient O(n) trim.
