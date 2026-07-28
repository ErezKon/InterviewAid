# 404. Sum of Left Leaves

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-left-leaves](https://leetcode.com/problems/sum-of-left-leaves)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Meta, Microsoft, Uber

---

## Problem Description
Given the root of a binary tree, return the sum of all left leaves.
A leaf is a node with no children. A left leaf is a leaf that is also a left child of its parent.

## Examples
**Example 1:**
Input: root = [3,9,20,null,null,15,7]
Output: 9
Explanation: The only left leaf is the node with value 9.

**Example 2:**
Input: root = [1]
Output: 0
Explanation: There are no left leaves.

## Approach
Use a depth‑first traversal. For each node, check if its left child is a leaf; if so, add its value to the sum.
Otherwise, recurse on both children.

```text
FUNCTION sumOfLeftLeaves(root):
    IF root == null: RETURN 0
    SET total ← 0
    IF root.left != null AND root.left.left == null AND root.left.right == null:
        SET total ← total + root.left.val
    SET total ← total + sumOfLeftLeaves(root.left)
    SET total ← total + sumOfLeftLeaves(root.right)
    RETURN total
```

## Walkthrough
| Step | Node | Action |
|------|------|--------|
| 1 | root (3) | Recurse left and right |
| 2 | left child (9) | Left child is leaf → add 9 |
| 3 | right child (20) | Recurse its children |
| 4 | left child (15) | Not a left leaf (not left child of 20) |
| 5 | right child (7) | Not a left leaf |
Total sum = 9.

## Complexity Analysis
Time: O(n) where n is number of nodes.
Space: O(h) recursion stack, h = tree height.

## Follow‑Up Questions
- How would you solve it iteratively using a stack?
- How to compute the sum of right leaves?
- Extend to sum of leaves at even depths.

## Key Takeaway
A left leaf can be identified during DFS by checking if a node's left child has no children; accumulate its value.
