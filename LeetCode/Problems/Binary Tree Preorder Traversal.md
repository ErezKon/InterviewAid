# 144. Binary Tree Preorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-preorder-traversal](https://leetcode.com/problems/binary-tree-preorder-traversal)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

## Problem Description
Given the root of a binary tree, return the values of its nodes obtained from a preorder traversal (node itself, then left subtree, then right subtree). The tree contains up to `10^4` nodes and node values are integers.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,null,2,3]` | `[1,2,3]` | Visit root `1`, then right subtree `2` (which visits left `3`). |
| `[]` | `[]` | Empty tree yields empty list. |

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
