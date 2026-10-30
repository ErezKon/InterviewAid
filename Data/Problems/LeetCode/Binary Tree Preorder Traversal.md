# 144. Binary Tree Preorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-preorder-traversal](https://leetcode.com/problems/binary-tree-preorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

## Problem Description
Given the `root` of a binary tree, return *the preorder traversal of its nodes' values*.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 ≤ Node.val ≤ 100`

**Follow up:** Recursive solution is trivial, could you do it iteratively?

## Examples
```
Example 1:
  Input: root = [1,null,2,3]
  Output: [1,2,3]

Example 2:
  Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
  Output: [1,2,4,5,6,7,3,8,9]

Example 3:
  Input: root = []
  Output: []

Example 4:
  Input: root = [1]
  Output: [1]
```

## Approach
Iterative depth‑first search using a stack. Push the root, then repeatedly pop a node, record its value, and push its right child followed by its left child so that left is processed first.

```text
FUNCTION preorderTraversal(root):
    IF root == null: RETURN []
    stack ← [root]
    result ← []
    WHILE stack IS NOT EMPTY:
        node ← POP(stack)
        APPEND node.val TO result
        IF node.right != null: PUSH(node.right) TO stack
        IF node.left != null: PUSH(node.left) TO stack
    RETURN result
```

## Walkthrough
For `[1,null,2,3]`:
1. Stack `[1]` → pop `1`, result `[1]`, push right `2` → stack `[2]`.
2. Pop `2`, result `[1,2]`, push right `null` and left `3` → stack `[3]`.
3. Pop `3`, result `[1,2,3]`, no children → stack empty.

## Complexity Analysis
- Time: O(n) – each node visited once.
- Space: O(n) – stack and result may hold up to n nodes.

## Follow-Up Questions
- How would you implement preorder traversal recursively?
- Can you achieve O(1) extra space using Morris traversal?
- How does the algorithm adapt for an n‑ary tree?

## Key Takeaway
A preorder traversal can be performed iteratively by using a stack to process nodes in root‑left‑right order, pushing right before left.
